import type { MetadataRoute } from 'next'
import { getServiceSlugs, getBlogPostSlugs, getCategories, getTags } from '@/lib/strapi'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thernbclinic.com'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/conditions-treated`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/testimonials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/book-appointment`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ]

  // Service slugs
  let servicePages: MetadataRoute.Sitemap = []
  try {
    const res = await getServiceSlugs()
    servicePages = (res.data || []).map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch { /* skip if Strapi not available */ }

  // Blog post slugs
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const res = await getBlogPostSlugs()
    blogPages = (res.data || []).map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch { /* skip */ }

  // Blog category pages
  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const res = await getCategories()
    categoryPages = (res.data || []).map((c) => ({
      url: `${SITE_URL}/blog/category/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch { /* skip */ }

  // Blog tag pages
  let tagPages: MetadataRoute.Sitemap = []
  try {
    const res = await getTags()
    tagPages = (res.data || []).map((t) => ({
      url: `${SITE_URL}/blog/tag/${t.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  } catch { /* skip */ }

  return [...staticPages, ...servicePages, ...blogPages, ...categoryPages, ...tagPages]
}
