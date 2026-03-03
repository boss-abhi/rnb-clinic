import Image from 'next/image'
import Link from 'next/link'
import type { Service, Condition } from '@/types/strapi'
import { getStrapiImageUrl } from '@/lib/strapi'
import { getServiceFallbackImage } from '@/lib/serviceImageFallback'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Badge from '@/components/ui/Badge'
import BlocksRenderer from '@/components/blog/BlocksRenderer'

interface ServiceDetailProps {
  service: Service
  relatedConditions?: Condition[]
}

export default function ServiceDetail({ service, relatedConditions = [] }: ServiceDetailProps) {
  const imgUrl = service.featured_image ? getStrapiImageUrl(service.featured_image) : null
  const fallbackImgUrl = getServiceFallbackImage(service)

  return (
    <article>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.name },
            ]}
            className="text-white/70 mb-6"
          />
          <div className="max-w-3xl">
            {service.category && (
              <p className="text-brand-green-light text-sm font-semibold uppercase tracking-wider mb-3">
                {service.category.name}
              </p>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {service.name}
            </h1>
            {service.short_description && (
              <p className="mt-4 text-lg text-white/75 leading-relaxed">{service.short_description}</p>
            )}
            <div className="mt-8">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-xl hover:bg-brand-green-dark transition-colors"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl bg-brand-neutral-100">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={service.featured_image?.alternativeText || service.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <img src={fallbackImgUrl} alt={service.name} className="h-full w-full object-cover" loading="eager" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {service.content ? (
          <div className="prose prose-lg max-w-none">
            <BlocksRenderer content={service.content as object[]} />
          </div>
        ) : (
          <p className="text-brand-neutral-900/60 text-lg">
            Our {service.name} programme is designed to provide comprehensive, evidence-based treatment tailored to your specific needs.{' '}
            <Link href="/contact" className="text-brand-blue hover:underline">Contact us</Link> to learn more.
          </p>
        )}

        {/* Related conditions */}
        {relatedConditions.length > 0 && (
          <div className="mt-12 pt-10 border-t border-brand-neutral-100">
            <h2 className="text-2xl font-bold text-brand-neutral-900 mb-4">Conditions We Treat</h2>
            <div className="flex flex-wrap gap-2">
              {relatedConditions.map((cond) => (
                <Link key={cond.id} href={`/conditions-treated#${cond.slug}`}>
                  <Badge variant="green">{cond.name}</Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-brand-neutral-900 mb-2">Ready to Start Your Recovery?</h2>
          <p className="text-brand-neutral-900/60 mb-6">Book your assessment today and take the first step towards pain-free living.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book-appointment" className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-dark transition-colors">
              Book Appointment
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-brand-blue text-brand-blue font-semibold rounded-xl hover:bg-brand-blue/5 transition-colors">
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
