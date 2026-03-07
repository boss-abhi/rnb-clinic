import type { StrapiResponse, StrapiMedia } from '@/types/strapi'

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337'
const READ_TOKEN = process.env.STRAPI_READ_TOKEN || ''

function getStrapiImageUrl(media: StrapiMedia | null | undefined): string {
  if (!media) return ''
  if (media.url.startsWith('http')) return media.url
  return `${STRAPI_URL}${media.url}`
}

export { getStrapiImageUrl }

async function strapiRequest<T>(
  path: string,
  params: Record<string, string | number | boolean> = {},
  options: RequestInit = {},
): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${path}`)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (READ_TOKEN) {
    headers.Authorization = `Bearer ${READ_TOKEN}`
  }

  const res = await fetch(url.toString(), {
    headers,
    ...options,
  })

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText} — ${path}`)
  }

  return res.json() as Promise<T>
}

// ── Collection helpers ────────────────────────────────────────────────────────

export async function getServices(params?: Record<string, string | number | boolean>) {
  return strapiRequest<StrapiResponse<import('@/types/strapi').Service[]>>(
    '/services',
    { sort: 'order:asc', 'pagination[pageSize]': 100, populate: '*', ...params },
    { next: { revalidate: 300 } },
  )
}

export async function getServiceBySlug(slug: string) {
  return strapiRequest<StrapiResponse<import('@/types/strapi').Service[]>>(
    '/services',
    { 'filters[slug][$eq]': slug, populate: '*', 'pagination[pageSize]': 1 },
    { next: { revalidate: 300 } },
  )
}

export async function getServiceSlugs() {
  return strapiRequest<StrapiResponse<import('@/types/strapi').Service[]>>(
    '/services',
    { fields: 'slug', 'pagination[pageSize]': 100 },
    { next: { revalidate: 300 } },
  )
}

export async function getServiceCategories() {
  return strapiRequest<StrapiResponse<import('@/types/strapi').ServiceCategory[]>>(
    '/service-categories',
    { sort: 'name:asc', 'pagination[pageSize]': 50 },
    { next: { revalidate: 600 } },
  )
}

export async function getConditions() {
  return strapiRequest<StrapiResponse<import('@/types/strapi').Condition[]>>(
    '/conditions',
    { sort: 'name:asc', populate: 'related_services', 'pagination[pageSize]': 100 },
    { next: { revalidate: 300 } },
  )
}

export async function getBlogPosts(params?: Record<string, string | number | boolean>) {
  return strapiRequest<StrapiResponse<import('@/types/strapi').BlogPost[]>>(
    '/blog-posts',
    { sort: 'publishedAt:desc', 'pagination[pageSize]': 9, populate: '*', ...params },
    { next: { revalidate: 120 } },
  )
}

export async function getBlogPostBySlug(slug: string) {
  return strapiRequest<StrapiResponse<import('@/types/strapi').BlogPost[]>>(
    '/blog-posts',
    { 'filters[slug][$eq]': slug, populate: '*', 'pagination[pageSize]': 1 },
    { next: { revalidate: 120 } },
  )
}

export async function getBlogPostSlugs() {
  return strapiRequest<StrapiResponse<import('@/types/strapi').BlogPost[]>>(
    '/blog-posts',
    { fields: 'slug', 'pagination[pageSize]': 200 },
    { next: { revalidate: 120 } },
  )
}

export async function getCategories() {
  return strapiRequest<StrapiResponse<import('@/types/strapi').Category[]>>(
    '/categories',
    { sort: 'name:asc', 'pagination[pageSize]': 50 },
    { next: { revalidate: 600 } },
  )
}

export async function getTags() {
  return strapiRequest<StrapiResponse<import('@/types/strapi').Tag[]>>(
    '/tags',
    { sort: 'name:asc', 'pagination[pageSize]': 100 },
    { next: { revalidate: 600 } },
  )
}

export async function getTestimonials(params?: Record<string, string | number | boolean>) {
  return strapiRequest<StrapiResponse<import('@/types/strapi').Testimonial[]>>(
    '/testimonials',
    { sort: 'id:asc', 'pagination[pageSize]': 50, populate: '*', ...params },
    { next: { revalidate: 300 } },
  )
}

export async function getTeamMembers(params?: Record<string, string | number | boolean>) {
  return strapiRequest<StrapiResponse<import('@/types/strapi').TeamMember[]>>(
    '/team-members',
    { sort: 'order:asc', populate: '*', ...params },
    { next: { revalidate: 600 } },
  )
}

export async function getHeroSlides() {
  return strapiRequest<StrapiResponse<import('@/types/strapi').HeroSlide[]>>(
    '/hero-slides',
    { sort: 'order:asc', 'filters[active][$eq]': true, populate: 'background_image', 'pagination[pageSize]': 10 },
    { next: { revalidate: 300 } },
  )
}

export async function getSiteSettings() {
  return strapiRequest<{ data: import('@/types/strapi').SiteSetting }>(
    '/site-setting',
    { populate: '*' },
    { next: { revalidate: 600 } },
  )
}
