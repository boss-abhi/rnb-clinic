'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [startTime] = useState(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check
    if (data.get('website')) return

    // Minimum time check (3 seconds)
    if (Date.now() - startTime < 3000) return

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: data.get('patient_name'),
          email: data.get('email'),
          phone: data.get('phone'),
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
        <h3 className="text-xl font-bold text-brand-neutral-900 mb-2">Message Received!</h3>
        <p className="text-brand-neutral-900/60">We&apos;ll get back to you within 24 hours.</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-neutral-900 mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-brand-neutral-100 bg-white text-brand-neutral-900 placeholder-brand-neutral-900/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-neutral-900 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-brand-neutral-100 bg-white text-brand-neutral-900 placeholder-brand-neutral-900/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors resize-none"
          placeholder="Describe your condition or question..."
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-6 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
