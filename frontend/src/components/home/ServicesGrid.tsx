import Link from 'next/link'
import type { Service } from '@/types/strapi'
import ServiceCard from '@/components/services/ServiceCard'
import SectionHeader from '@/components/ui/SectionHeader'

interface ServicesGridProps {
  services: Service[]
}

const PLACEHOLDER_SERVICES = [
  {
    slug: 'back-and-spine-rehabilitation',
    icon: '🦴',
    title: 'Back & Spine Rehabilitation',
    desc: 'Evidence-based treatment for lower back pain, sciatica, disc herniation, cervical spondylosis, and postural disorders.',
  },
  {
    slug: 'sports-injury-rehabilitation',
    icon: '⚡',
    title: 'Sports Injury Rehabilitation',
    desc: 'Rapid, protocol-driven recovery for ligament tears, muscle strains, tendinopathies, and overuse injuries.',
  },
  {
    slug: 'joint-pain-and-arthritis',
    icon: '🦵',
    title: 'Joint Pain & Arthritis',
    desc: 'Knee, hip, shoulder, and ankle pain managed through manual therapy, graded exercise, and joint care education.',
  },
  {
    slug: 'neurological-rehabilitation',
    icon: '🧠',
    title: 'Neurological Rehabilitation',
    desc: "Specialist therapy for stroke, Parkinson's disease, spinal cord injury, and traumatic brain injury recovery.",
  },
  {
    slug: 'paediatric-physiotherapy',
    icon: '👶',
    title: 'Paediatric Physiotherapy',
    desc: 'Child-friendly therapy for developmental delays, cerebral palsy, brachial plexus injuries, and growing pains.',
  },
  {
    slug: 'electrotherapy',
    icon: '🔬',
    title: 'Electrotherapy & Modalities',
    desc: 'TENS, interferential therapy (IFT), therapeutic ultrasound, and laser therapy for accelerated healing.',
  },
]

export default function ServicesGrid({ services }: ServicesGridProps) {
  const featured = services.filter((s) => s.featured).slice(0, 6)
  const display = featured.length > 0 ? featured : services.slice(0, 6)
  const usePlaceholder = display.length === 0

  return (
    <section className="section-padding bg-white" aria-label="Our physiotherapy treatments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <SectionHeader
            eyebrow="What We Treat"
            title="Specialist Physiotherapy Treatments"
            description="Comprehensive, evidence-based therapy for pain relief, recovery, and long-term wellness across all ages."
          />
          <Link
            href="/services"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border-2 border-brand-blue text-brand-blue font-semibold rounded-xl hover:bg-brand-blue hover:text-white transition-all text-sm"
          >
            All Treatments
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {!usePlaceholder ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {display.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLACEHOLDER_SERVICES.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative flex flex-col gap-4 p-7 rounded-2xl border border-brand-neutral-100 bg-white hover:border-brand-blue/20 shadow-card hover:shadow-card-hover transition-all duration-250 overflow-hidden"
              >
                <span className="absolute top-4 right-5 text-5xl font-black text-brand-neutral-900/4 leading-none select-none" aria-hidden="true">
                  0{i + 1}
                </span>
                <div className="w-12 h-12 rounded-xl bg-brand-blue-50 flex items-center justify-center text-2xl group-hover:bg-brand-blue transition-all duration-250">
                  <span aria-hidden="true">{s.icon}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-brand-neutral-900 text-base leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-brand-neutral-900/60 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-brand-blue text-xs font-semibold">
                  Learn more
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Conditions CTA band */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-brand-neutral-50 border border-brand-neutral-100">
          <div>
            <p className="font-display font-bold text-brand-neutral-900 text-base">Not sure if we treat your condition?</p>
            <p className="text-sm text-brand-neutral-900/60 mt-0.5">Browse our full list of 50+ conditions we manage.</p>
          </div>
          <Link
            href="/conditions-treated"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-brand-neutral-200 text-brand-neutral-900 font-semibold rounded-xl hover:border-brand-blue hover:text-brand-blue shadow-sm transition-all text-sm"
          >
            View All Conditions
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
