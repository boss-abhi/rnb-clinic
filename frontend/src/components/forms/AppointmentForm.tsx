'use client'

import { useState } from 'react'
import type { Service } from '@/types/strapi'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface AppointmentFormProps {
  services: Service[]
}

const TIME_SLOTS = [
  { value: 'Morning', label: 'Morning (9 AM – 12 PM)' },
  { value: 'Afternoon', label: 'Afternoon (12 PM – 4 PM)' },
  { value: 'Evening', label: 'Evening (4 PM – 8 PM)' },
]

export default function AppointmentForm({ services }: AppointmentFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [startTime] = useState(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get('website')) return
    if (Date.now() - startTime < 3000) return

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: data.get('patient_name'),
          email: data.get('email'),
          phone: data.get('phone'),
          service: data.get('service'),
          preferred_date: data.get('preferred_date'),
          preferred_time: data.get('preferred_time'),
          message: data.get('message'),
        }),
      })

      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try calling us directly.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-brand-green/10 border border-brand-green/30 rounded-2xl p-8 text-center" role="alert">
        <svg className="mx-auto mb-4 text-brand-green" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3 className="text-xl font-bold text-brand-neutral-900 mb-2">Appointment Request Sent!</h3>
        <p className="text-brand-neutral-900/60">We&apos;ll confirm your appointment within a few hours. Check your phone or email.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="patient_name" className="block text-sm font-medium text-brand-neutral-900 mb-1.5">
            Full Name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="patient_name"
            name="patient_name"
            type="text"
            required
            autoComplete="name"
            className="w-full px-4 py-3 rounded-xl border border-brand-neutral-100 bg-white text-brand-neutral-900 placeholder-brand-neutral-900/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-neutral-900 mb-1.5">
            Phone <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full px-4 py-3 rounded-xl border border-brand-neutral-100 bg-white text-brand-neutral-900 placeholder-brand-neutral-900/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-neutral-900 mb-1.5">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full px-4 py-3 rounded-xl border border-brand-neutral-100 bg-white text-brand-neutral-900 placeholder-brand-neutral-900/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-brand-neutral-900 mb-1.5">Service Required</label>
        <select
          id="service"
          name="service"
          className="w-full px-4 py-3 rounded-xl border border-brand-neutral-100 bg-white text-brand-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
        >
          <option value="">Select a service (optional)</option>
          {services.map((s) => (
            <option key={s.id} value={s.documentId}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="preferred_date" className="block text-sm font-medium text-brand-neutral-900 mb-1.5">Preferred Date</label>
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border border-brand-neutral-100 bg-white text-brand-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
          />
        </div>
        <div>
          <label htmlFor="preferred_time" className="block text-sm font-medium text-brand-neutral-900 mb-1.5">Preferred Time</label>
          <select
            id="preferred_time"
            name="preferred_time"
            className="w-full px-4 py-3 rounded-xl border border-brand-neutral-100 bg-white text-brand-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
          >
            <option value="">Any time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.value}>{slot.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-neutral-900 mb-1.5">Additional Notes</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-brand-neutral-100 bg-white text-brand-neutral-900 placeholder-brand-neutral-900/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors resize-none"
          placeholder="Describe your condition or any special requirements..."
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-6 bg-brand-green text-white font-semibold rounded-xl hover:bg-brand-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting…' : 'Request Appointment'}
      </button>

      <p className="text-xs text-center text-brand-neutral-900/40">
        We respect your privacy. Your information is never shared with third parties.
      </p>
    </form>
  )
}
