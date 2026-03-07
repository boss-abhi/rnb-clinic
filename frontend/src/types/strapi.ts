// Strapi 5 REST API response types

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  url: string
  formats?: {
    thumbnail?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    large?: StrapiMediaFormat
  }
  width: number
  height: number
  mime: string
}

interface StrapiMediaFormat {
  url: string
  width: number
  height: number
}

export interface FAQ {
  id: number
  question: string
  answer: string
}

// Collection Types

export interface Service {
  id: number
  documentId: string
  name: string
  slug: string
  short_description: string | null
  content: object | null
  icon: StrapiMedia | null
  featured_image: StrapiMedia | null
  category: ServiceCategory | null
  seo_title: string | null
  seo_description: string | null
  og_image: StrapiMedia | null
  order: number
  featured: boolean
  publishedAt: string | null
}

export interface ServiceCategory {
  id: number
  documentId: string
  name: string
  slug: string
  description: string | null
  services?: Service[]
}

export interface Condition {
  id: number
  documentId: string
  name: string
  slug: string
  short_description: string | null
  related_services?: Service[]
}

export interface BlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  content: object | null
  featured_image: StrapiMedia | null
  featured_image_alt: string | null
  author: TeamMember | null
  categories?: Category[]
  tags?: Tag[]
  faqs?: FAQ[]
  seo_title: string | null
  seo_description: string | null
  og_image: StrapiMedia | null
  reading_time: number | null
  ranchi_reference: boolean
  updatedAt?: string | null
  publishedAt: string | null
}

export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  description: string | null
}

export interface Tag {
  id: number
  documentId: string
  name: string
  slug: string
}

export interface Testimonial {
  id: number
  documentId: string
  patient_name: string
  designation: string | null
  content: string
  rating: number
  photo: StrapiMedia | null
  service: Service | null
  featured: boolean
  publishedAt: string | null
}

export interface TeamMember {
  id: number
  documentId: string
  name: string
  slug: string
  designation: string | null
  bio: object | null
  photo: StrapiMedia | null
  qualifications: string | null
  experience_years: number | null
  specializations?: Service[]
  order: number
  featured: boolean
}

export interface HeroSlide {
  id: number
  documentId: string
  title: string
  subtitle: string | null
  cta_text: string | null
  cta_link: string | null
  background_image: StrapiMedia | null
  order: number
  active: boolean
}

// Single Types

export interface SiteSetting {
  id: number
  documentId: string
  clinic_name: string
  tagline: string | null
  phone: string | null
  whatsapp: string | null
  email: string | null
  address: string | null
  google_maps_iframe: string | null
  facebook_url: string | null
  instagram_url: string | null
  instagram_reels: string | null
  youtube_url: string | null
  logo: StrapiMedia | null
  favicon: StrapiMedia | null
  og_default_image: StrapiMedia | null
  footer_tagline: string | null
  appointment_email: string | null
  smtp_configured: boolean
}
