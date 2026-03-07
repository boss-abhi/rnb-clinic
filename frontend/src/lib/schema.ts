import type { BlogPost, Service, FAQ } from '@/types/strapi'
import { getStrapiImageUrl } from './strapi'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thernbclinic.com'

export function medicalClinicSchema(settings: {
  clinic_name: string
  phone: string | null
  address: string | null
  email: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    name: settings.clinic_name,
    url: SITE_URL,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    address: settings.address
      ? { '@type': 'PostalAddress', streetAddress: settings.address, addressLocality: 'Ranchi', addressRegion: 'Jharkhand', addressCountry: 'IN' }
      : undefined,
    geo: { '@type': 'GeoCoordinates', latitude: 23.3441, longitude: 85.3096 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '20:00' },
    ],
    medicalSpecialty: 'Physiotherapy',
    priceRange: '₹₹',
  }
}

export function blogPostingSchema(post: BlogPost, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.featured_image ? getStrapiImageUrl(post.featured_image) : undefined,
    datePublished: post.publishedAt || undefined,
    author: post.author
      ? { '@type': 'Person', name: post.author.name }
      : { '@type': 'Organization', name: 'The RNB Clinic' },
    publisher: { '@type': 'Organization', name: 'The RNB Clinic', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
  }
}

export function faqPageSchema(faqs: FAQ[]) {
  if (!faqs || faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.short_description || undefined,
    url: `${SITE_URL}/services/${service.slug}`,
  }
}
