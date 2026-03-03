'use client'

import { useState } from 'react'
import type { Testimonial } from '@/types/strapi'
import SectionHeader from '@/components/ui/SectionHeader'

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? '#F59E0B' : 'none'}
          stroke="#F59E0B"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  )
}

const FALLBACK = [
  { id: 1, patient_name: 'Rohit Sharma', designation: 'Software Engineer, Ranchi', content: 'After 3 months of chronic back pain, RNB Clinic resolved it in just 8 sessions. The therapists are extremely knowledgeable.', rating: 5 },
  { id: 2, patient_name: 'Priya Devi', designation: 'Teacher, Jharkhand', content: 'My knee pain after surgery was managed brilliantly. The post-op rehab programme was personalised and effective.', rating: 5 },
  { id: 3, patient_name: 'Ajay Verma', designation: 'Retired Army Officer', content: 'The best physiotherapy clinic in Ranchi. Professional staff, modern equipment, and genuine care for patients.', rating: 5 },
]

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const items = testimonials.length > 0 ? testimonials : FALLBACK as unknown as Testimonial[]
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(items.length / perPage)
  const visible = items.slice(page * perPage, page * perPage + perPage)

  return (
    <section className="section-padding bg-white" aria-label="Patient testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Patient Stories"
          title="What Our Patients Say"
          description="Real experiences from patients who reclaimed their mobility and quality of life at The RNB Clinic."
          center
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((t) => (
            <article
              key={t.id}
              className="relative bg-white rounded-2xl p-7 border border-brand-neutral-100 shadow-card flex flex-col gap-5 hover:shadow-card-hover hover:border-brand-blue/15 transition-all duration-250"
            >
              {/* Quote mark decoration */}
              <div className="absolute top-5 right-6 text-4xl font-black text-brand-blue/8 leading-none select-none" aria-hidden="true">&ldquo;</div>

              <StarRating rating={t.rating || 5} />
              <blockquote className="text-brand-neutral-900/75 text-sm leading-relaxed flex-1">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3 pt-3 border-t border-brand-neutral-100">
                <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                  {t.patient_name.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-brand-neutral-900">{t.patient_name}</p>
                  {t.designation && <p className="text-xs text-brand-neutral-900/50 mt-0.5">{t.designation}</p>}
                </div>
              </footer>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                aria-pressed={i === page}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === page ? 'bg-brand-blue w-6' : 'bg-brand-neutral-100'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
