import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/types/strapi'
import { getStrapiImageUrl } from '@/lib/strapi'
import { getServiceFallbackImage } from '@/lib/serviceImageFallback'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const imgUrl = service.featured_image ? getStrapiImageUrl(service.featured_image) : null
  const fallbackImgUrl = getServiceFallbackImage(service)

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block bg-white rounded-2xl border border-brand-neutral-100 shadow-card hover:shadow-card-hover hover:border-brand-blue/20 transition-all duration-250 overflow-hidden"
    >
      <div className="aspect-video relative overflow-hidden bg-brand-neutral-100">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={service.featured_image?.alternativeText || service.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <img
            src={fallbackImgUrl}
            alt={service.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}
      </div>

      <div className="p-5">
        {service.category && (
          <p className="text-xs font-semibold text-brand-green uppercase tracking-wider mb-2">
            {service.category.name}
          </p>
        )}
        <h3 className="font-display text-lg font-bold text-brand-neutral-900 group-hover:text-brand-blue transition-colors leading-snug mb-2">
          {service.name}
        </h3>
        {service.short_description && (
          <p className="text-brand-neutral-900/60 text-sm leading-relaxed line-clamp-2">
            {service.short_description}
          </p>
        )}
        <div className="mt-4 flex items-center text-brand-blue text-sm font-semibold gap-1">
          Learn more
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
