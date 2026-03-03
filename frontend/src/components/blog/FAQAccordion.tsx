'use client'

import { useState } from 'react'
import type { FAQ } from '@/types/strapi'

interface FAQAccordionProps {
  faqs: FAQ[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="mt-14" aria-label="Frequently Asked Questions">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0">
          <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-brand-neutral-900">
          Frequently Asked Questions
        </h2>
      </div>

      <dl className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={faq.id || i}
            className={`rounded-xl overflow-hidden border transition-colors duration-200 ${
              openIndex === i
                ? 'border-brand-blue/30 bg-brand-blue-50/40'
                : 'border-brand-neutral-100 bg-white hover:border-brand-neutral-200'
            }`}
          >
            <dt>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-start justify-between px-5 py-4 text-left gap-4"
              >
                <span className="font-display font-semibold text-brand-neutral-900 leading-snug text-base">
                  {faq.question}
                </span>
                <div className={`mt-0.5 w-6 h-6 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 ${openIndex === i ? 'gradient-brand text-white' : 'bg-brand-neutral-100 text-brand-neutral-600'}`}>
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    className={`transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </dt>
            {openIndex === i && (
              <dd className="px-5 pb-5 text-brand-neutral-900/70 leading-relaxed border-t border-brand-blue/10 pt-3 text-sm md:text-base">
                {faq.answer}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  )
}
