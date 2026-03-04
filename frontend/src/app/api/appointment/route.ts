import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const LEADS_SHEET_WEBHOOK_URL = process.env.LEADS_SHEET_WEBHOOK_URL || ''

const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = Number(process.env.SMTP_PORT || 465)
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const LEADS_EMAIL_TO = process.env.LEADS_EMAIL_TO || ''

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

async function pushToSheet(payload: Record<string, unknown>) {
  if (!LEADS_SHEET_WEBHOOK_URL) return

  try {
    await fetch(LEADS_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })
  } catch (err) {
    console.error('Sheet webhook error:', err)
  }
}

async function sendLeadEmail(payload: Record<string, unknown>) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEADS_EMAIL_TO) return

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    const rows = Object.entries(payload)
      .map(([key, value]) => `<tr><td style="padding:6px 10px;border:1px solid #ddd;"><b>${key}</b></td><td style="padding:6px 10px;border:1px solid #ddd;">${String(value ?? '')}</td></tr>`)
      .join('')

    await transporter.sendMail({
      from: `RNB Clinic Website <${SMTP_USER}>`,
      to: LEADS_EMAIL_TO,
      subject: 'New Appointment Lead - The RNB Clinic',
      html: `<h3>New Appointment Lead</h3><table style="border-collapse:collapse;">${rows}</table>`,
    })
  } catch (err) {
    console.error('Lead email error:', err)
  }
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

  const validTimeSlots = ['Morning', 'Afternoon', 'Evening']

  const leadPayload = {
    source: 'appointment_form',
    patient_name: String(patient_name).slice(0, 200),
    phone: String(phone).slice(0, 50),
    email: email ? String(email).slice(0, 200) : '',
    service: service ? String(service).slice(0, 200) : '',
    preferred_date: preferred_date ? String(preferred_date).slice(0, 20) : '',
    preferred_time: preferred_time && validTimeSlots.includes(String(preferred_time)) ? String(preferred_time) : '',
    message: message ? String(message).slice(0, 1000) : '',
    ip_address: ip,
    submitted_at: new Date().toISOString(),
  }

  await Promise.allSettled([
    pushToSheet(leadPayload),
    sendLeadEmail(leadPayload),
  ])

  return NextResponse.json({ success: true }, { status: 201 })
}
