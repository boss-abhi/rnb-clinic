import Link from 'next/link'

interface CTABannerProps {
  phone?: string | null
  whatsapp?: string | null
}

export default function CTABanner({ phone, whatsapp }: CTABannerProps) {
  const waNumber = (whatsapp || phone || '').replace(/\D/g, '')

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Call to action — book an appointment"
    >
      <div className="absolute inset-0 gradient-hero" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-green opacity-10 blur-[100px] translate-x-1/3 -translate-y-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-blue-light opacity-15 blur-[80px] -translate-x-1/4 translate-y-1/4"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" aria-hidden="true" />
          <span className="section-eyebrow text-brand-green-light">Your Recovery Starts Today</span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 max-w-3xl mx-auto leading-tight">
          Ready to Move Without Pain Again?
        </h2>
        <p className="text-white/75 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Join 5,000+ patients who recovered at The RNB Clinic. Our expert physiotherapists are ready to create a personalised treatment plan for you.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/book-appointment"
            className="px-8 py-4 bg-white text-brand-blue font-bold rounded-xl hover:bg-brand-neutral-50 transition-colors text-base shadow-lg shadow-black/20"
          >
            Book Appointment
          </Link>
          {phone && (
            <a
              href={`tel:${phone}`}
              className="px-8 py-4 bg-white/12 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 transition-colors text-base"
            >
              Call {phone}
            </a>
          )}
          {waNumber && (
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#1ebe58] text-white font-semibold rounded-xl transition-colors text-base"
            >
              WhatsApp Us
            </a>
          )}
        </div>

        <p className="mt-6 text-white/50 text-xs">
          No referral required · Evidence-based care · Same-week appointments
        </p>
      </div>
    </section>
  )
}
