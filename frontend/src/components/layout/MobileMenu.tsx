'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  sub?: { href: string; label: string }[]
}

interface MobileMenuProps {
  navItems: NavItem[]
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => { setOpen(false); setExpanded(null) }, [pathname])
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2 rounded-lg hover:bg-brand-neutral-100 transition-colors"
      >
        <span className={`block w-5 h-0.5 bg-brand-neutral-900 transition-transform duration-200 origin-center ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block w-5 h-0.5 bg-brand-neutral-900 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-brand-neutral-900 transition-transform duration-200 origin-center ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[300] lg:hidden">
          <div className="absolute inset-0 z-[300] bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <nav
            id="mobile-nav"
            className="fixed inset-y-0 right-0 z-[310] h-screen w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col overflow-hidden"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="relative z-[320] flex items-center justify-between px-5 py-5 border-b border-brand-neutral-100">
              <span className="font-display font-extrabold text-lg">
                <span className="text-brand-blue">RNB</span>
                <span className="text-brand-green"> Clinic</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-brand-neutral-100 transition-colors"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <ul className="relative z-[320] flex flex-col px-3 py-3 flex-1 overflow-y-auto overscroll-contain">
              {navItems.map(({ href, label, sub }) => (
                <li key={href}>
                  {sub ? (
                    <>
                      <button
                        onClick={() => setExpanded(expanded === label ? null : label)}
                        aria-expanded={expanded === label}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-brand-neutral-900 hover:bg-brand-neutral-50 transition-colors"
                      >
                        {label}
                        <svg
                          width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                          className={`transition-transform duration-200 ${expanded === label ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expanded === label && (
                        <ul className="ml-4 mb-1 border-l-2 border-brand-blue/20 pl-3 space-y-0.5">
                          {sub.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block px-3 py-2 rounded-lg text-sm text-brand-neutral-900/70 hover:text-brand-blue hover:bg-brand-blue-50 transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href={href}
                              className="block px-3 py-2 rounded-lg text-sm text-brand-blue font-semibold hover:bg-brand-blue-50 transition-colors"
                            >
                              View all →
                            </Link>
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={href}
                      className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                        pathname === href
                          ? 'bg-brand-blue/10 text-brand-blue font-semibold'
                          : 'text-brand-neutral-900 hover:bg-brand-neutral-50'
                      }`}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Footer CTA */}
            <div className="relative z-[320] px-5 pb-8 pt-4 border-t border-brand-neutral-100 space-y-2">
              <Link
                href="/book-appointment"
                className="block w-full text-center px-6 py-3 gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 border border-brand-neutral-200 text-brand-neutral-900 font-medium rounded-xl hover:bg-brand-neutral-50 transition-colors text-sm"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
