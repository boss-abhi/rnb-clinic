import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'

const DIFFERENTIATORS = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Qualified BPT Physiotherapists',
    desc: 'Every therapist holds a Bachelor of Physiotherapy degree and completes regular continuing education to stay current with best-practice guidelines.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Evidence-Based Treatment Plans',
    desc: 'We follow clinical research guidelines and adapt treatment protocols based on your response, ensuring your care is both personalised and scientifically sound.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Compassionate, Patient-First Care',
    desc: 'We listen before we treat. Your goals, concerns, and comfort always guide how we design and deliver your physiotherapy programme.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Full Electrotherapy Suite',
    desc: 'From TENS and interferential therapy to therapeutic ultrasound and laser treatment — our clinic has the modalities to accelerate your recovery.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'All Ages — from Paediatric to Elderly',
    desc: 'Our therapists are trained to work with patients of all ages — from newborns with developmental conditions to elderly patients recovering from falls or strokes.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Conveniently Located in Ranchi',
    desc: 'Centrally located and easily accessible, with flexible appointment times designed to fit around work and family schedules.',
  },
]

const CARD_GRADIENTS = [
  'bg-gradient-to-br from-blue-50 to-cyan-50/70',
  'bg-gradient-to-br from-emerald-50 to-teal-50/70',
  'bg-gradient-to-br from-indigo-50 to-sky-50/70',
  'bg-gradient-to-br from-violet-50 to-indigo-50/70',
  'bg-gradient-to-br from-amber-50 to-orange-50/70',
  'bg-gradient-to-br from-rose-50 to-pink-50/70',
]

const ICON_TINTS = [
  'bg-blue-100/80 text-blue-700',
  'bg-emerald-100/80 text-emerald-700',
  'bg-indigo-100/80 text-indigo-700',
  'bg-violet-100/80 text-violet-700',
  'bg-amber-100/80 text-amber-700',
  'bg-rose-100/80 text-rose-700',
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-padding bg-white" aria-label="Why choose The RNB Clinic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow="The RNB Difference"
            title="Why Patients Trust Us With Their Recovery"
            description="From your first assessment to your last session, we are with you every step of the way — with clinical rigour and genuine care."
          />
          <Link
            href="/about#why-us"
            className="inline-flex items-center gap-2 mt-6 text-brand-blue font-semibold text-sm hover:text-brand-blue-dark transition-colors"
          >
            Learn more about us
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIFFERENTIATORS.map((item, i) => (
            <div
              key={item.title}
              className={`group relative flex gap-4 p-6 rounded-2xl border border-brand-neutral-100 hover:border-brand-blue/20 ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} transition-all duration-250 shadow-sm hover:shadow-md`}
            >
              {/* Number tag */}
              <div className="absolute top-4 right-4 text-xs font-bold text-brand-neutral-200">
                0{i + 1}
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ICON_TINTS[i % ICON_TINTS.length]} group-hover:bg-brand-blue group-hover:text-white transition-all duration-250`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-display font-bold text-brand-neutral-900 text-base leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-neutral-900/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
