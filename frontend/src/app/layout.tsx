import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import { getSiteSettings, getStrapiImageUrl } from '@/lib/strapi'

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
  let faviconUrl = '/favicon.ico'
  try {
    const res = await getSiteSettings()
    if (res.data?.favicon) {
      faviconUrl = getStrapiImageUrl(res.data.favicon)
    }
  } catch {
    // fallback to static favicon
  }

  return {
    title: 'The RNB Clinic, Ranchi — Expert Physiotherapy',
    description: 'Leading physiotherapy clinic in Ranchi offering expert treatment for back pain, sports injuries, stroke rehabilitation, and more.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thernbclinic.com'),
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
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
