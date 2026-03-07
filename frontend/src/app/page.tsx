import type { Metadata } from 'next'
import { getHeroSlides, getServices, getTestimonials, getBlogPosts, getSiteSettings } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import { medicalClinicSchema } from '@/lib/schema'
import SchemaOrg from '@/components/ui/SchemaOrg'
import HeroSlider from '@/components/home/HeroSlider'
import StatsBar from '@/components/home/StatsBar'
import ServicesGrid from '@/components/home/ServicesGrid'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import HowItWorks from '@/components/home/HowItWorks'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import BlogPreview from '@/components/home/BlogPreview'
import CTABanner from '@/components/home/CTABanner'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  let settings = null
  try {
    const res = await getSiteSettings()
    settings = res.data
  } catch { /* fallback */ }

  return buildMetadata({
    title: 'Best Physiotherapy in Ranchi, Jharkhand for Pain Relief, Sports Injury Rehab, Stroke Recovery, Mobility Care',
    description: 'The RNB Clinic offers Physiotherapy in Ranchi, Jharkhand for back pain, sports injuries, stroke rehab, and mobility care. Trusted Physiotherapy in Ranchi, Jharkhand with personalized treatment plans and expert therapists.',
    path: '/',
    keywords: [
      'pain relief physiotherapy ranchi',
      'neuro rehab clinic ranchi',
      'sports injury physio ranchi',
      'knee and back pain treatment ranchi',
      'book physiotherapy consultation ranchi',
    ],
  })
}

export default async function HomePage() {
  const [slidesRes, servicesRes, testimonialsRes, postsRes, settingsRes] = await Promise.allSettled([
    getHeroSlides(),
    getServices(),
    getTestimonials({ 'filters[featured][$eq]': true }),
    getBlogPosts({ 'pagination[pageSize]': 3 }),
    getSiteSettings(),
  ])

  const slides = slidesRes.status === 'fulfilled' ? slidesRes.value.data : []
  const services = servicesRes.status === 'fulfilled' ? servicesRes.value.data : []
  const testimonials = testimonialsRes.status === 'fulfilled' ? testimonialsRes.value.data : []
  const posts = postsRes.status === 'fulfilled' ? postsRes.value.data : []
  const settings = settingsRes.status === 'fulfilled' ? settingsRes.value.data : null

  const clinicSchema = medicalClinicSchema({
    clinic_name: settings?.clinic_name || 'The RNB Clinic',
    phone: settings?.phone || null,
    address: settings?.address || null,
    email: settings?.email || null,
  })

  return (
    <>
      <SchemaOrg schema={clinicSchema} />
      {/* 1. Hero — full-bleed above fold */}
      <HeroSlider slides={slides} />
      {/* 2. Quick trust stats */}
      <StatsBar />
      {/* 3. Services grid */}
      <ServicesGrid services={services} />
      {/* 4. Why Choose Us */}
      <WhyChooseUs />
      {/* 5. How It Works */}
      <HowItWorks />
      {/* 6. Testimonials */}
      <TestimonialsCarousel testimonials={testimonials} />
      {/* 7. Blog preview */}
      <BlogPreview posts={posts} />
      {/* 8. CTA */}
      <CTABanner phone={settings?.phone} whatsapp={settings?.whatsapp} />
    </>
  )
}
