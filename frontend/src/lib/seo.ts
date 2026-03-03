import type { Metadata } from 'next'
import type { StrapiMedia } from '@/types/strapi'
import { getStrapiImageUrl } from './strapi'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thernbclinic.com'
const SITE_NAME = 'The RNB Clinic, Ranchi'

export function buildTitle(pageTitle?: string | null): string {
  if (!pageTitle) return `${SITE_NAME} — Expert Physiotherapy`
  return `${pageTitle} | ${SITE_NAME}`
}

interface MetaOptions {
  title?: string | null
  description?: string | null
  ogImage?: StrapiMedia | null
  path?: string
  noIndex?: boolean
}

export function buildMetadata(opts: MetaOptions): Metadata {
  const { title, description, ogImage, path = '/', noIndex = false } = opts
  const resolvedTitle = buildTitle(title)
  const ogImageUrl = ogImage ? getStrapiImageUrl(ogImage) : `${SITE_URL}/og-default.jpg`
  const canonical = `${SITE_URL}${path}`

  return {
    title: resolvedTitle,
    description: description || undefined,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description: description || undefined,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: resolvedTitle }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: description || undefined,
      images: [ogImageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}
