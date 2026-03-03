'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { HeroSlide } from '@/types/strapi'
import { getStrapiImageUrl } from '@/lib/strapi'

interface HeroSliderProps {
  slides: HeroSlide[]
}

const FALLBACK_SLIDES = [
  {
    id: 0,
    title: 'Expert Physiotherapy Care in Ranchi',
    subtitle: 'Restoring movement, relieving pain, improving lives — with evidence-based physiotherapy tailored to you.',
    cta_text: 'Book Appointment',
    cta_link: '/book-appointment',
  },
  {
    id: -1,
    title: 'Recover Faster. Move Better. Live Fully.',
    subtitle: 'Specialist physiotherapy for back pain, sports injuries, stroke rehab, and more. Trusted by 5,000+ patients.',
    cta_text: 'See Our Services',
    cta_link: '/services',
  },
]

const TRUST_BADGES = [
  { icon: '✓', text: 'Qualified BPT Therapists' },
  { icon: '✓', text: 'Evidence-Based Protocols' },
  { icon: '✓', text: '10+ Years in Ranchi' },
]

// Royalty-free fallback visuals (used when Strapi hero image is missing)
const HERO_SIDE_IMAGES = [
  '/hero-rnb-2026-01-07.jpg',
  'https://images.pexels.com/photos/7580256/pexels-photo-7580256.jpeg?auto=compress&cs=tinysrgb&w=1200',
  '/hero-expert.jpg',
]

export default function HeroSlider({ slides }: HeroSliderProps) {
  const items = slides.length > 0 ? slides : FALLBACK_SLIDES
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((idx: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent(idx)
    setTimeout(() => setAnimating(false), 500)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % items.length), [current, items.length, goTo])

  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, items.length])

  const slide = items[current] as HeroSlide & {
    background_image?: { url: string; width: number; height: number; alternativeText: string | null } | null
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const imgUrl = slide.background_image ? getStrapiImageUrl(slide.background_image) : null
  const fallbackImage = HERO_SIDE_IMAGES[current % HERO_SIDE_IMAGES.length]
  const sideImageUrl = imgUrl || (fallbackImage.startsWith('/') ? `${basePath}${fallbackImage}` : fallbackImage)

  return (
    <section
      className="relative min-h-[580px] md:min-h-[680px] lg:min-h-[720px] flex items-center overflow-hidden"
      aria-label="Hero banner"
    >
      {/* Gradient base */}
      <div className="absolute inset-0 gradient-hero" aria-hidden="true" />

      {/* Decorative blobs */}
      <div
        className="hero-blob w-[600px] h-[600px] bg-brand-green-dark top-[-100px] right-[-200px]"
        aria-hidden="true"
      />
      <div
        className="hero-blob w-[400px] h-[400px] bg-brand-blue-light bottom-[-100px] left-[-100px]"
        aria-hidden="true"
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Background image */}
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={slide.background_image?.alternativeText || slide.title}
          fill
          className="object-cover opacity-25"
          priority
          sizes="100vw"
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" aria-hidden="true" />
              <span className="text-brand-green-light text-xs font-bold tracking-widest uppercase">
                The RNB Clinic, Ranchi
              </span>
            </div>

            <h1
              className={`font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}
            >
              {slide.title}
            </h1>

            {slide.subtitle && (
              <p
                className={`mt-5 md:mt-7 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl transition-opacity duration-500 delay-75 ${animating ? 'opacity-0' : 'opacity-100'}`}
              >
                {slide.subtitle}
              </p>
            )}

            <div
              className={`mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 transition-opacity duration-500 delay-100 ${animating ? 'opacity-0' : 'opacity-100'}`}
            >
              {slide.cta_link && slide.cta_text && (
                <Link
                  href={slide.cta_link}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl shadow-lg shadow-brand-green/25 hover:shadow-brand-green/40 transition-all text-base"
                >
                  {slide.cta_text}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl transition-all text-base"
              >
                Explore Treatments
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className={`mt-10 md:mt-12 flex flex-wrap gap-3 transition-opacity duration-500 delay-150 ${animating ? 'opacity-0' : 'opacity-100'}`}
            >
              {TRUST_BADGES.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5"
                >
                  <span className="text-brand-green-light font-bold text-sm" aria-hidden="true">{icon}</span>
                  <span className="text-white/85 text-xs font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right-side hero visual */}
          <div className={`hidden lg:block lg:col-span-5 transition-opacity duration-500 delay-150 ${animating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-brand-blue-dark/40 bg-white/5 backdrop-blur-sm">
              <img
                src={sideImageUrl}
                alt={slide.title}
                className="w-full h-[420px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      {items.length > 1 && (
        <>
          <button
            onClick={() => goTo((current - 1 + items.length) % items.length)}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors backdrop-blur-sm border border-white/20"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={() => goTo((current + 1) % items.length)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors backdrop-blur-sm border border-white/20"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2" aria-label="Slide indicators">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-400 ${i === current ? 'bg-white w-8' : 'bg-white/40 w-1.5 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48L1440 48L1440 0C1440 0 1080 48 720 48C360 48 0 0 0 0L0 48Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
