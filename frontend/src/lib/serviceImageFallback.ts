import type { Service } from '@/types/strapi'

export function getServiceFallbackImage(service: Pick<Service, 'slug'>): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${basePath}/service-images/${service.slug}.png`
}
