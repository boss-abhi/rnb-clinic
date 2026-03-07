import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import { getSiteSettings } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const FIXED_CONTACT = {
  phone: '+91 70424 90276',
  whatsapp: '+91 70424 90276',
  address: '4th Floor, Park Square Building, near Cinema Plaza, Tharpakhna, Lalpur, Ranchi, Jharkhand 834001, India',
}

export async function generateMetadata(): Promise<Metadata> {
  let dynamicTitle: string | null = null
  let dynamicDescription: string | null = null

  try {
    const res = await getSiteSettings()
    dynamicTitle = res.data?.clinic_name ? `${res.data.clinic_name} — Physiotherapy in Ranchi` : null
    dynamicDescription = res.data?.meta_description || null
  } catch {
    // CMS unavailable in production-safe mode; static fallback below
  }

  const metadata = buildMetadata({
    title: dynamicTitle,
    description:
      dynamicDescription ||
      'The RNB Clinic provides advanced physiotherapy in Ranchi for pain relief, recovery, mobility, and long-term rehabilitation.',
    path: '/',
    keywords: [
      'neuro physiotherapy ranchi',
      'orthopaedic physiotherapy ranchi',
      'physio clinic near lalpur ranchi',
      'sports physiotherapy clinic ranchi',
      'posture correction physiotherapy',
      'joint pain rehab ranchi',
    ],
  })

  return {
    ...metadata,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/rnb-clinic-logo-original.png', type: 'image/png', sizes: '512x512' },
      ],
      shortcut: ['/favicon.ico'],
      apple: [{ url: '/rnb-clinic-logo-original.png', sizes: '180x180', type: 'image/png' }],
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings = null
  try {
    const res = await getSiteSettings()
    settings = res.data
  } catch {
    // Strapi may not be running during build; use fallback nulls
  }

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer
          clinicName={settings?.clinic_name || 'The RNB Clinic'}
          phone={FIXED_CONTACT.phone}
          email={settings?.email || 'info@thernbclinic.com'}
          address={FIXED_CONTACT.address}
          whatsapp={FIXED_CONTACT.whatsapp}
          facebook_url={settings?.facebook_url}
          instagram_url={settings?.instagram_url}
          youtube_url={settings?.youtube_url}
          footer_tagline={settings?.footer_tagline}
        />
        <FloatingActions phone={FIXED_CONTACT.phone} whatsapp={FIXED_CONTACT.whatsapp} />

        {/* Google Analytics — only injected when GA_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
