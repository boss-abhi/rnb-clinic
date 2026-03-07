import type { Metadata } from 'next'
import type { StrapiMedia } from '@/types/strapi'
import { getStrapiImageUrl } from './strapi'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thernbclinic.com'
const SITE_NAME = 'The RNB Clinic, Ranchi'
const DEFAULT_OG_IMAGE = `${SITE_URL}/rnb-clinic-logo-original.png`

const DEFAULT_KEYWORDS = [
  'physiotherapy clinic ranchi',
  'best physiotherapist in ranchi',
  'back pain physiotherapy ranchi',
  'sports injury rehabilitation ranchi',
  'stroke rehabilitation physiotherapy',
  'knee pain physiotherapy',
  'neck pain treatment ranchi',
  'dry needling therapy ranchi',
  'manual therapy ranchi',
  'post-surgery physiotherapy ranchi',
  'women health physiotherapy ranchi',
  'paediatric physiotherapy ranchi',
]

export function buildTitle(pageTitle?: string | null): string {
  if (!pageTitle) return `${SITE_NAME} — Expert Physiotherapy Care`
  return `${pageTitle} | ${SITE_NAME}`
}

function normalizeKeyword(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

function uniqueKeywords(values: string[] = []): string[] {
  const seen = new Set<string>()
  const out: string[] = []

  for (const raw of values) {
    const keyword = raw?.trim()
    if (!keyword) continue
    const normalized = normalizeKeyword(keyword)
    if (seen.has(normalized)) continue
    seen.add(normalized)
    out.push(keyword)
  }

  return out
}

interface MetaOptions {
  title?: string | null
  description?: string | null
  ogImage?: StrapiMedia | null
  path?: string
  noIndex?: boolean
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

export function buildMetadata(opts: MetaOptions): Metadata {
  const {
    title,
    description,
    ogImage,
    path = '/',
    noIndex = false,
    keywords = [],
    type = 'website',
    publishedTime,
    modifiedTime,
  } = opts

  const resolvedTitle = buildTitle(title)
  const resolvedDescription = description || undefined
  const ogImageUrl = ogImage ? getStrapiImageUrl(ogImage) : DEFAULT_OG_IMAGE
  const canonical = `${SITE_URL}${path}`
  const dedupedKeywords = uniqueKeywords([...DEFAULT_KEYWORDS, ...keywords])

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    referrer: 'origin-when-cross-origin',
    keywords: dedupedKeywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'healthcare',
    alternates: {
      canonical,
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: resolvedTitle }],
      type,
      publishedTime,
      modifiedTime,
    },
    facebook: {
      appId: process.env.NEXT_PUBLIC_FB_APP_ID || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImageUrl],
      site: process.env.NEXT_PUBLIC_TWITTER_SITE || undefined,
      creator: process.env.NEXT_PUBLIC_TWITTER_CREATOR || undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || undefined,
      other: {
        'facebook-domain-verification': process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION || undefined,
      },
    },
    other: {
      'theme-color': '#0B5ED7',
      'google': 'notranslate',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
    },
  }
}
