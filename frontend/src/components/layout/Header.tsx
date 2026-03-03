'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'

// ── Navigation structure (reference-site depth) ────────────────────────────
const SERVICE_LINKS = [
  { href: '/services/back-spine-treatment', label: 'Back & Spine Rehabilitation' },
  { href: '/services/sports-injury-recovery', label: 'Sports Injury Rehabilitation' },
  { href: '/services/knee-joint-rehabilitation', label: 'Joint Pain & Arthritis' },
  { href: '/services/stroke-neurological-rehabilitation', label: 'Neurological Rehabilitation' },
  { href: '/services/paediatric-physiotherapy', label: 'Paediatric Physiotherapy' },
  { href: '/services/post-surgical-rehabilitation', label: 'Post-Surgical Rehabilitation' },
  { href: '/services/electrotherapy-ultrasound', label: 'Electrotherapy & Modalities' },
  { href: '/services/womens-health-physiotherapy', label: "Women's Health Physiotherapy" },
]

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  {
    href: '/about',
    label: 'About Us',
    sub: [
      { href: '/about', label: 'Our Story & Mission' },
      { href: '/about#team', label: 'Meet the Physiotherapists' },
      { href: '/about#why-us', label: 'Why Choose RNB Clinic' },
    ],
  },
  {
    href: '/services',
    label: 'Treatments',
    sub: SERVICE_LINKS,
  },
  { href: '/conditions-treated', label: 'Conditions We Treat' },
  { href: '/testimonials', label: 'Patient Stories' },
  { href: '/blog', label: 'Health Resources' },
  { href: '/contact', label: 'Contact' },
]

function DropdownMenu({ items, onClose }: { items: { href: string; label: string }[]; onClose: () => void }) {
  return (
    <div
      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-brand-neutral-100 py-2 z-50 overflow-hidden"
      onMouseLeave={onClose}
    >
      {items.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-neutral-900/80 hover:text-brand-blue hover:bg-brand-blue-50 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/30 shrink-0" aria-hidden="true" />
          {label}
        </Link>
      ))}
      <div className="mx-4 mt-2 pt-2 border-t border-brand-neutral-100">
        <Link
          href={items[0]?.href.startsWith('/services') ? '/services' : '/about'}
          onClick={onClose}
          className="flex items-center gap-1 text-xs text-brand-blue font-semibold hover:text-brand-blue-dark transition-colors py-1"
        >
          View all →
        </Link>
      </div>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [logoFailed, setLogoFailed] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const logoSrc = `${basePath}/rnb-clinic-logo.png`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpenDropdown(null)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-brand-neutral-100'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 shrink-0"
            aria-label="The RNB Clinic — home"
          >
            {!logoFailed ? (
              <Image
                src={logoSrc}
                alt="The RNB Clinic"
                width={320}
                height={96}
                priority
                unoptimized
                className="h-14 md:h-16 w-auto object-contain -my-1"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <>
                <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0">
                  <span className="text-white font-extrabold text-sm leading-none">R</span>
                </div>
                <span className="font-display font-extrabold text-lg tracking-tight leading-none">
                  <span className="text-brand-blue">RNB</span>
                  <span className="text-brand-green"> Clinic</span>
                </span>
              </>
            )}
          </Link>

          {/* Desktop nav */}
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ href, label, sub }) => (
              <div
                key={href}
                className="relative"
                onMouseEnter={() => sub && setOpenDropdown(label)}
                onMouseLeave={() => sub && setOpenDropdown(null)}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(href) && href !== '/'
                      ? 'text-brand-blue font-semibold bg-brand-blue-50'
                      : href === '/' && pathname === '/'
                      ? 'text-brand-blue font-semibold'
                      : 'text-brand-neutral-900/70 hover:text-brand-blue hover:bg-brand-neutral-50'
                  }`}
                  aria-current={isActive(href) ? 'page' : undefined}
                  aria-expanded={sub ? openDropdown === label : undefined}
                  aria-haspopup={sub ? 'true' : undefined}
                >
                  {label}
                  {sub && (
                    <svg
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      className={`transition-transform duration-200 ${openDropdown === label ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {sub && openDropdown === label && (
                  <DropdownMenu items={sub} onClose={() => setOpenDropdown(null)} />
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/book-appointment"
              className="px-5 py-2.5 gradient-brand text-white text-sm font-semibold rounded-xl hover:opacity-90 active:opacity-80 transition-opacity shadow-sm"
            >
              Book Appointment
            </Link>
          </div>

          <MobileMenu navItems={NAV_ITEMS} />
        </div>
      </div>
    </header>
  )
}
