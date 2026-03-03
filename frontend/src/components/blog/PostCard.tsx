import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/types/strapi'
import { getStrapiImageUrl } from '@/lib/strapi'
import { getBlogFallbackImage } from '@/lib/blogImageFallback'
import Badge from '@/components/ui/Badge'

interface PostCardProps {
  post: BlogPost
  featured?: boolean
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const imgUrl = post.featured_image ? getStrapiImageUrl(post.featured_image) : null
  const fallbackImgUrl = getBlogFallbackImage(post)
  const imgAlt = post.featured_image_alt || post.featured_image?.alternativeText || post.title

  if (featured) {
    return (
      <article className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-brand-neutral-100 shadow-card hover:shadow-card-hover hover:border-brand-blue/20 transition-all duration-300 bg-white">
        <div className="md:w-2/5 shrink-0 relative min-h-[220px] md:min-h-[280px] overflow-hidden">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={imgAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          ) : (
            <img
              src={fallbackImgUrl}
              alt={imgAlt}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          )}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-xs font-bold text-white gradient-brand rounded-full shadow-sm">
              Featured
            </span>
          </div>
        </div>
        <div className="flex flex-col p-7 flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories?.slice(0, 2).map((cat) => (
              <Link key={cat.id} href={`/blog/category/${cat.slug}`}>
                <Badge variant="blue">{cat.name}</Badge>
              </Link>
            ))}
          </div>
          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-display font-extrabold text-brand-neutral-900 text-2xl md:text-3xl leading-snug tracking-tight mb-3 group-hover:text-brand-blue transition-colors">
              {post.title}
            </h3>
          </Link>
          {post.excerpt && (
            <p className="text-brand-neutral-900/60 leading-relaxed mb-5 flex-1 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between gap-4 mt-auto">
            <div className="flex items-center gap-2 text-xs text-brand-neutral-400">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              )}
              {post.reading_time && <span>· {post.reading_time} min read</span>}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:text-brand-blue-dark transition-colors"
            >
              Read article
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-brand-neutral-100 bg-white shadow-card hover:shadow-card-hover hover:border-brand-blue/20 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={imgAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <img
            src={fallbackImgUrl}
            alt={imgAlt}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex flex-col p-5 flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.categories?.slice(0, 2).map((cat) => (
            <Link key={cat.id} href={`/blog/category/${cat.slug}`}>
              <Badge variant="blue">{cat.name}</Badge>
            </Link>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-display font-bold text-brand-neutral-900 text-lg leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="text-brand-neutral-900/60 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-brand-neutral-100">
          <div className="flex items-center gap-2 text-xs text-brand-neutral-400 flex-wrap">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            )}
            {post.reading_time && <span>· {post.reading_time} min read</span>}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs text-brand-blue font-semibold hover:text-brand-blue-dark transition-colors shrink-0"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  )
}
