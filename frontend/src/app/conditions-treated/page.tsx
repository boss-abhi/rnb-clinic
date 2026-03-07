import type { Metadata } from 'next'
import Link from 'next/link'
import { getConditions } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import { faqPageSchema } from '@/lib/schema'
import SchemaOrg from '@/components/ui/SchemaOrg'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import CTABanner from '@/components/home/CTABanner'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Physiotherapy in Ranchi, Jharkhand for Conditions | Back Pain, Sciatica, Stroke, Sports Injury',
    description: 'Browse conditions managed through Physiotherapy in Ranchi, Jharkhand including sciatica, back pain, stroke recovery, and sports injuries. The RNB Clinic provides targeted Physiotherapy in Ranchi, Jharkhand based on condition-specific rehab plans.',
    path: '/conditions-treated',
    keywords: [
      'conditions treated by physiotherapy',
      'sciatica and slip disc treatment ranchi',
      'stroke rehab and mobility recovery',
      'sports and orthopaedic injury rehab',
    ],
  })
}

export default async function ConditionsTreatedPage() {
  let conditions: Awaited<ReturnType<typeof getConditions>>['data'] = []
  try {
    const res = await getConditions()
    conditions = res.data
  } catch { /* fallback */ }

  const faqSchema = faqPageSchema(
    conditions.slice(0, 5).map((c) => ({
      id: c.id,
      question: `Can physiotherapy help with ${c.name}?`,
      answer: c.short_description || `Yes, physiotherapy can be very effective for ${c.name}. Our therapists will assess your condition and create a personalised treatment plan.`,
    }))
  )

  return (
    <>
      {faqSchema && <SchemaOrg schema={faqSchema} />}

      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Conditions We Treat</h1>
          <p className="text-white/75 text-lg max-w-xl">
            Our expert physiotherapists treat a wide range of musculoskeletal, neurological, and sports conditions.
          </p>
        </div>
      </div>

      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {conditions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition) => (
              <div
                key={condition.id}
                id={condition.slug}
                className="bg-white rounded-2xl border border-brand-neutral-100 shadow-sm p-6 hover:shadow-md hover:border-brand-blue/20 transition-all"
              >
                <h2 className="text-lg font-bold text-brand-neutral-900 mb-2">{condition.name}</h2>
                {condition.short_description && (
                  <p className="text-sm text-brand-neutral-900/60 leading-relaxed mb-4">{condition.short_description}</p>
                )}
                {condition.related_services && condition.related_services.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-brand-neutral-900/40 uppercase tracking-wider mb-2">Relevant Services</p>
                    <div className="flex flex-wrap gap-2">
                      {condition.related_services.map((svc) => (
                        <Link key={svc.id} href={`/services/${svc.slug}`}>
                          <Badge variant="blue">{svc.name}</Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-brand-neutral-900/40">
            <p className="text-lg">Content coming soon. Please call us to discuss your condition.</p>
          </div>
        )}

        <div className="mt-16 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-brand-neutral-900 mb-3">Don&apos;t See Your Condition?</h2>
          <p className="text-brand-neutral-900/60 mb-6">Contact us — our therapists treat many more conditions than listed here.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-dark transition-colors">
              Contact Us
            </Link>
            <Link href="/book-appointment" className="px-6 py-3 border border-brand-blue text-brand-blue font-semibold rounded-xl hover:bg-brand-blue/5 transition-colors">
              Book Assessment
            </Link>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  )
}
