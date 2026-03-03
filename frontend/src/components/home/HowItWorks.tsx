import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'

const STEPS = [
  {
    number: '01',
    title: 'Book Your Appointment',
    desc: 'Choose a convenient time online, by phone, or on WhatsApp. Same-day and next-day slots are often available. No referral needed.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'text-brand-blue bg-brand-blue-50',
  },
  {
    number: '02',
    title: 'Comprehensive Assessment',
    desc: 'Your physiotherapist conducts a detailed evaluation — movement analysis, strength testing, and medical history — to pinpoint the exact source of your problem.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: 'text-brand-green bg-brand-green-50',
  },
  {
    number: '03',
    title: 'Personalised Treatment Plan',
    desc: 'We design a programme specifically for you — combining hands-on therapy, electrotherapy, and targeted exercises based on your diagnosis and recovery goals.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: 'text-brand-blue bg-brand-blue-50',
  },
  {
    number: '04',
    title: 'Achieve Your Recovery Goals',
    desc: 'Progress is monitored at every session. We adjust your programme as you improve — and equip you with a home programme to maintain results long-term.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-brand-green bg-brand-green-50',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-brand-neutral-50" aria-label="How physiotherapy works at RNB Clinic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Your Journey"
          title="How Your Treatment Works"
          description="Four simple steps from your first call to long-term recovery. No referrals. No waiting lists."
          center
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-[calc(50%+28px)] right-[-50%] h-px border-t-2 border-dashed border-brand-neutral-200"
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center shadow-sm`}>
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-brand text-white text-xs font-black flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-brand-neutral-900 text-base mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-neutral-900/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 px-8 py-4 gradient-brand text-white font-bold rounded-xl shadow-blue hover:opacity-90 transition-opacity text-base"
          >
            Start Your Recovery Today
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="mt-3 text-xs text-brand-neutral-400">No referral required · Same-week appointments</p>
        </div>
      </div>
    </section>
  )
}
