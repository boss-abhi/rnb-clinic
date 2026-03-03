import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337'
const WRITE_TOKEN = process.env.STRAPI_WRITE_TOKEN || ''

const ipTimestamps = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 10

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (ipTimestamps.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (timestamps.length >= MAX_REQUESTS) return true
  timestamps.push(now)
  ipTimestamps.set(ip, timestamps)
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { patient_name, phone, email, service, preferred_date, preferred_time, message } = body

  if (!patient_name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
  }

  if (typeof patient_name !== 'string' || typeof phone !== 'string') {
    return NextResponse.json({ error: 'Invalid field types' }, { status: 400 })
  }

  // Validate preferred_date
  let sanitisedDate: string | null = null
  if (preferred_date && typeof preferred_date === 'string') {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (dateRegex.test(preferred_date)) {
      sanitisedDate = preferred_date
    }
  }

  const validTimeSlots = ['Morning', 'Afternoon', 'Evening']
  const sanitisedTime = (preferred_time && validTimeSlots.includes(String(preferred_time))) ? String(preferred_time) : null

  try {
    const strapiRes = await fetch(`${STRAPI_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${WRITE_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          patient_name: String(patient_name).slice(0, 200),
          phone: String(phone).slice(0, 50),
          email: email ? String(email).slice(0, 200) : null,
          message: message ? String(message).slice(0, 1000) : null,
          preferred_date: sanitisedDate,
          preferred_time: sanitisedTime,
          source: 'appointment_form',
          status: 'new',
          ip_address: ip,
          // Note: service relation would need documentId — pass-through as-is (Strapi handles)
          ...(service && typeof service === 'string' ? { service: service } : {}),
        },
      }),
    })

    if (!strapiRes.ok) {
      const err = await strapiRes.text()
      console.error('Strapi appointment create error:', err)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Appointment API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
