import Link from 'next/link'

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/conditions-treated', label: 'Conditions Treated' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

interface FooterProps {
  clinicName?: string
  phone?: string | null
  email?: string | null
  address?: string | null
  whatsapp?: string | null
  facebook_url?: string | null
  instagram_url?: string | null
  youtube_url?: string | null
  footer_tagline?: string | null
}

export default function Footer({
  clinicName = 'The RNB Clinic',
  phone,
  email,
  address,
  whatsapp,
  facebook_url,
  instagram_url,
  youtube_url,
  footer_tagline,
}: FooterProps) {
  const year = new Date().getFullYear()
  const waNumber = (whatsapp || phone || '').replace(/\D/g, '')

  return (
    <footer className="bg-brand-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white/95">The </span>
              <span className="text-brand-blue-light">RNB</span>
              <span className="text-brand-green-light"> Clinic</span>
            </span>
            <p className="mt-3 text-white/60 text-sm leading-relaxed">
              {footer_tagline || 'Expert physiotherapy care in Ranchi. Restoring movement, improving lives.'}
            </p>
            <div className="mt-4 flex gap-3">
              {facebook_url && (
                <a href={facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {instagram_url && (
                <a href={instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#E1306C] flex items-center justify-center transition-colors">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {youtube_url && (
                <a href={youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#FF0000] flex items-center justify-center transition-colors">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/70 hover:text-white text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Book</h3>
            <ul className="space-y-2">
              <li><Link href="/book-appointment" className="text-white/70 hover:text-white text-sm transition-colors">Book Appointment</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">Contact Us</Link></li>
              {waNumber && (
                <li>
                  <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-sm transition-colors">
                    WhatsApp Us
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-white/70">
              {phone && (
                <li className="flex gap-2">
                  <svg width="16" height="16" className="mt-0.5 shrink-0 text-brand-green-light" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.89 12 19.79 19.79 0 011.9 3.43 2 2 0 013.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
                </li>
              )}
              {email && (
                <li className="flex gap-2">
                  <svg width="16" height="16" className="mt-0.5 shrink-0 text-brand-green-light" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                </li>
              )}
              {address && (
                <li className="flex gap-2">
                  <svg width="16" height="16" className="mt-0.5 shrink-0 text-brand-green-light" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>{address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {year} {clinicName}. All rights reserved.</p>
          <p>Designed for expert physiotherapy care in Ranchi, Jharkhand.</p>
        </div>
      </div>
    </footer>
  )
}
