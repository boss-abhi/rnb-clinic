import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getServiceSlugs, getConditions } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import { serviceSchema, breadcrumbSchema } from '@/lib/schema'
import SchemaOrg from '@/components/ui/SchemaOrg'
import ServiceDetail from '@/components/services/ServiceDetail'

export const revalidate = 300

export async function generateStaticParams() {
  try {
    const res = await getServiceSlugs()
    return (res.data || []).map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const res = await getServiceBySlug(slug)
    const service = res.data?.[0]
    if (!service) return {}
    return buildMetadata({
      title: service.seo_title || `${service.name} Physiotherapy, Pain Relief Treatment, Rehabilitation Program & Recovery Plan`,
      description: service.seo_description || `${service.name} treatment through Physiotherapy in Ranchi, Jharkhand with targeted sessions, hands-on care, and progression tracking. Start Physiotherapy in Ranchi, Jharkhand for lasting mobility and pain relief.`,
      ogImage: service.og_image || service.featured_image,
      path: `/services/${service.slug}`,
      keywords: [
        `${service.name} ranchi`,
        `physiotherapy for ${service.name.toLowerCase()}`,
        'personalized rehabilitation plan',
      ],
    })
  } catch {
    return {}
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params

  const [serviceRes, conditionsRes] = await Promise.allSettled([
    getServiceBySlug(slug),
    getConditions(),
  ])

  const service = serviceRes.status === 'fulfilled' ? serviceRes.value.data?.[0] : null
  if (!service) notFound()

  const allConditions = conditionsRes.status === 'fulfilled' ? conditionsRes.value.data : []
  const relatedConditions = allConditions.filter((c) =>
    c.related_services?.some((rs) => rs.slug === service.slug)
  )

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thernbclinic.com'

  return (
    <>
      <SchemaOrg schema={serviceSchema(service)} />
      <SchemaOrg schema={breadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Services', url: `${SITE_URL}/services` },
        { name: service.name, url: `${SITE_URL}/services/${service.slug}` },
      ])} />
      <ServiceDetail service={service} relatedConditions={relatedConditions} />
    </>
  )
}
