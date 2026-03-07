import type { Metadata } from 'next'
import { getTestimonials, getSiteSettings } from '@/lib/strapi'
import { getGoogleReviews } from '@/lib/googleReviews'
import { buildMetadata } from '@/lib/seo'
import { getInstagramVideosFromCms, toInstagramEmbedUrl } from '@/lib/instagramFeed'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABanner from '@/components/home/CTABanner'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Physiotherapy in Ranchi, Jharkhand Reviews | Real Patient Results at The RNB Clinic',
    description: 'Read genuine patient feedback about Physiotherapy in Ranchi, Jharkhand at The RNB Clinic. These recovery stories highlight real outcomes from Physiotherapy in Ranchi, Jharkhand for pain, injury, and post-surgery rehabilitation.',
    path: '/testimonials',
    keywords: [
      'physiotherapy patient reviews ranchi',
      'rnb clinic testimonials',
      'rehabilitation outcomes ranchi',
      'physio success stories',
    ],
  })
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= rating ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  )
}

export default async function TestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof getTestimonials>>['data'] = []
  let googleReviews: Awaited<ReturnType<typeof getGoogleReviews>> = []
  let instagramVideos: ReturnType<typeof getInstagramVideosFromCms> = []

  const [testimonialsRes, googleRes, settingsRes] = await Promise.allSettled([
    getTestimonials(),
    getGoogleReviews(6),
    getSiteSettings(),
  ])

  if (testimonialsRes.status === 'fulfilled') {
    testimonials = testimonialsRes.value.data
  }

  if (googleRes.status === 'fulfilled') {
    googleReviews = googleRes.value
  }

  if (settingsRes.status === 'fulfilled') {
    instagramVideos = getInstagramVideosFromCms(settingsRes.value.data?.instagram_reels)
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Patient Stories</h1>
          <p className="text-white/75 text-lg max-w-xl">
            Real results from real patients. See how physiotherapy at The RNB Clinic transformed their lives.
          </p>
        </div>
      </div>

      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Reviews"
          title="What Our Patients Say"
          description="Join thousands of patients who have found relief and improved mobility at The RNB Clinic."
          center
        />

        {instagramVideos.length > 0 && (
          <>
            <div className="mt-10 mb-4 text-center">
              <h2 className="text-2xl font-bold text-brand-neutral-900">From Instagram</h2>
              <p className="text-brand-neutral-900/60 text-sm mt-1">Recent clinic reels and treatment moments.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instagramVideos.map((video, idx) => (
                <article key={`${video.url}-${idx}`} className="bg-white rounded-2xl border border-brand-neutral-100 shadow-sm p-3">
                  <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: '125%' }}>
                    <iframe
                      src={toInstagramEmbedUrl(video.url)}
                      title={video.title}
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                      allow="encrypted-media; clipboard-write; fullscreen"
                    />
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {testimonials.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <article key={t.id} className="bg-white rounded-2xl border border-brand-neutral-100 shadow-sm p-6 flex flex-col">
                <StarRating rating={t.rating || 5} />
                <blockquote className="text-brand-neutral-900/80 text-sm leading-relaxed flex-1 mb-4">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <footer className="flex items-center gap-3 mt-auto pt-4 border-t border-brand-neutral-100">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-sm" aria-hidden="true">
                    {t.patient_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-brand-neutral-900">{t.patient_name}</p>
                    {t.designation && <p className="text-xs text-brand-neutral-900/50">{t.designation}</p>}
                    {t.service && <p className="text-xs text-brand-green font-medium mt-0.5">{t.service.name}</p>}
                  </div>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center py-10 text-brand-neutral-900/40">
            <p>Patient testimonials coming soon.</p>
          </div>
        )}

        {googleReviews.length > 0 && (
          <>
            <div className="mt-14 mb-4 text-center">
              <h2 className="text-2xl font-bold text-brand-neutral-900">Google Reviews</h2>
              <p className="text-brand-neutral-900/60 text-sm mt-1">Live ratings pulled from our Google Business profile.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {googleReviews.map((r, idx) => (
                <article key={`${r.author}-${idx}`} className="bg-white rounded-2xl border border-brand-neutral-100 shadow-sm p-6 flex flex-col">
                  <StarRating rating={r.rating || 5} />
                  <blockquote className="text-brand-neutral-900/80 text-sm leading-relaxed flex-1 mb-4">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <footer className="flex items-center gap-3 mt-auto pt-4 border-t border-brand-neutral-100">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-bold text-sm" aria-hidden="true">
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-brand-neutral-900">{r.author}</p>
                      {r.relativeTime && <p className="text-xs text-brand-neutral-900/50">{r.relativeTime}</p>}
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      <CTABanner />
    </>
  )
}
