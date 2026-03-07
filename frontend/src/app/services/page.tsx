import type { Metadata } from 'next'
import { getServices, getServiceCategories } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import ServiceCard from '@/components/services/ServiceCard'
import SectionHeader from '@/components/ui/SectionHeader'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Physiotherapy Services: Manual Therapy, Dry Needling, Sports Injury Rehab, Neuro Rehab, Post-Surgery Recovery',
    description: 'Explore comprehensive Physiotherapy in Ranchi, Jharkhand for pain relief, posture correction, neuro rehab, and sports recovery. Our clinic provides Physiotherapy in Ranchi, Jharkhand with structured protocols and measurable progress tracking.',
    path: '/services',
    keywords: [
      'physiotherapy treatments ranchi',
      'manual therapy and dry needling ranchi',
      'sports rehab services ranchi',
      'neurological physiotherapy services',
    ],
  })
}

export default async function ServicesPage() {
  const [servicesRes, catsRes] = await Promise.allSettled([
    getServices(),
    getServiceCategories(),
  ])

  const services = servicesRes.status === 'fulfilled' ? servicesRes.value.data : []
  const categories = catsRes.status === 'fulfilled' ? catsRes.value.data : []

  return (
    <>
      {/* Hero */}
      <div className="gradient-hero py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" aria-hidden="true" />
            <span className="section-eyebrow text-brand-green-light">Specialist Treatments</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Physiotherapy Treatments
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Comprehensive, evidence-based physiotherapy treatments delivered by expert therapists at The RNB Clinic, Ranchi. From acute injuries to long-term rehabilitation.
          </p>
        </div>
      </div>

      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.length > 0 ? (
          categories.map((cat) => {
            const catServices = services.filter((s) => s.category?.slug === cat.slug)
            if (catServices.length === 0) return null
            return (
              <section key={cat.id} className="mb-16" aria-labelledby={`cat-${cat.slug}`}>
                <SectionHeader
                  eyebrow="Category"
                  title={cat.name}
                  description={cat.description || undefined}
                />
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </section>
            )
          })
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {services.length === 0 && (
          <div className="text-center py-20 text-brand-neutral-900/40">
            <p className="text-lg">Services coming soon. Please check back shortly.</p>
          </div>
        )}
      </div>
    </>
  )
}
