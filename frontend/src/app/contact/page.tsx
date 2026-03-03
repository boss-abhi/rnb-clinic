import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import SchemaOrg from '@/components/ui/SchemaOrg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactForm from '@/components/forms/ContactForm'

export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Contact Us',
    description: 'Contact The RNB Clinic, Ranchi. Call, WhatsApp, or fill out our online form to get in touch with our physiotherapy team.',
    path: '/contact',
  })
}

export default async function ContactPage() {
  let settings = null
  try {
    const res = await getSiteSettings()
    settings = res.data
  } catch { /* fallback */ }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thernbclinic.com'
  const waNumber = (settings?.whatsapp || settings?.phone || '').replace(/\D/g, '')

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Contact', url: `${SITE_URL}/contact` },
      ])} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
            className="text-white/70 mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Contact Us</h1>
          <p className="text-white/75 text-lg">Reach out to our team — we&apos;re here to help.</p>
        </div>
      </div>

      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div>
            <h2 className="text-2xl font-bold text-brand-neutral-900 mb-6">Get In Touch</h2>
            <div className="space-y-6">
              {settings?.phone && (
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-brand-blue" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.89 12 19.79 19.79 0 011.9 3.43 2 2 0 013.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-neutral-900 mb-1">Phone</p>
                    <a href={`tel:${settings.phone}`} className="text-brand-blue hover:underline">{settings.phone}</a>
                  </div>
                </div>
              )}

              {waNumber && (
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-[#25D366]" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-neutral-900 mb-1">WhatsApp</p>
                    <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">Send us a message</a>
                  </div>
                </div>
              )}

              {settings?.email && (
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-brand-blue" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-neutral-900 mb-1">Email</p>
                    <a href={`mailto:${settings.email}`} className="text-brand-blue hover:underline">{settings.email}</a>
                  </div>
                </div>
              )}

              {settings?.address && (
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-brand-blue" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-neutral-900 mb-1">Address</p>
                    <p className="text-brand-neutral-900/60">{settings.address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Map embed */}
            {settings?.google_maps_iframe && (
              <div className="mt-8 rounded-2xl overflow-hidden border border-brand-neutral-100 shadow-sm h-64" dangerouslySetInnerHTML={{ __html: settings.google_maps_iframe }} />
            )}
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="text-2xl font-bold text-brand-neutral-900 mb-6">Send Us a Message</h2>
            <div className="bg-brand-neutral-50 rounded-2xl border border-brand-neutral-100 p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
