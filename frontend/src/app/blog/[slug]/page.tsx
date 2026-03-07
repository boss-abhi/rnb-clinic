import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getBlogPostSlugs, getBlogPosts } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import { blogPostingSchema, faqPageSchema, breadcrumbSchema } from '@/lib/schema'
import { getStrapiImageUrl } from '@/lib/strapi'
import { getBlogFallbackImage } from '@/lib/blogImageFallback'
import SchemaOrg from '@/components/ui/SchemaOrg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Badge from '@/components/ui/Badge'
import PostBody from '@/components/blog/PostBody'
import FAQAccordion from '@/components/blog/FAQAccordion'
import RelatedPosts from '@/components/blog/RelatedPosts'

export const revalidate = 120

export async function generateStaticParams() {
  try {
    const res = await getBlogPostSlugs()
    return (res.data || []).map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const res = await getBlogPostBySlug(slug)
    const post = res.data?.[0]
    if (!post) return {}
    return buildMetadata({
      title: post.seo_title || `${post.title} | Physiotherapy in Ranchi, Jharkhand — Expert Guidance from The RNB Clinic`,
      description: post.seo_description || `${post.title}: expert guidance on Physiotherapy in Ranchi, Jharkhand with practical recovery steps. Learn evidence-based Physiotherapy in Ranchi, Jharkhand from The RNB Clinic care team.`,
      ogImage: post.og_image || post.featured_image,
      path: `/blog/${post.slug}`,
      keywords: [
        post.title,
        ...(post.tags?.map((t) => t.name) || []),
        'physiotherapy knowledge article',
      ],
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || post.publishedAt || undefined,
    })
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  const [postRes, relatedRes] = await Promise.allSettled([
    getBlogPostBySlug(slug),
    getBlogPosts({ 'pagination[pageSize]': 3 }),
  ])

  const post = postRes.status === 'fulfilled' ? postRes.value.data?.[0] : null
  if (!post) notFound()

  const allPosts = relatedRes.status === 'fulfilled' ? relatedRes.value.data : []
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const imgUrl = post.featured_image ? getStrapiImageUrl(post.featured_image) : null
  const fallbackImgUrl = getBlogFallbackImage(post)
  const imgAlt = post.featured_image_alt || post.featured_image?.alternativeText || post.title
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thernbclinic.com'

  const blogSchema = blogPostingSchema(post, `/blog/${post.slug}`)
  const faqSchema = post.faqs && post.faqs.length >= 3 ? faqPageSchema(post.faqs) : null
  const bcSchema = breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ])

  return (
    <>
      <SchemaOrg schema={blogSchema} />
      {faqSchema && <SchemaOrg schema={faqSchema} />}
      <SchemaOrg schema={bcSchema} />

      {/* Hero strip */}
      <div className="gradient-hero py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Health Resources', href: '/blog' },
              { label: post.title },
            ]}
            className="mb-5"
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((cat) => (
              <Link key={cat.id} href={`/blog/category/${cat.slug}`}>
                <Badge variant="blue">{cat.name}</Badge>
              </Link>
            ))}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-white/60 flex-wrap">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            )}
            {post.reading_time && <span>· {post.reading_time} min read</span>}
            {post.author && <span>· By {post.author.name}</span>}
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Featured image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-card bg-brand-neutral-100">
          {imgUrl ? (
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" priority />
          ) : (
            <img src={fallbackImgUrl} alt={imgAlt} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
          )}
        </div>

        {/* Excerpt callout */}
        {post.excerpt && (
          <div className="relative mb-8 p-5 rounded-xl border-l-4 border-brand-blue bg-brand-blue-50/50">
            <p className="text-brand-neutral-900/80 leading-relaxed font-medium text-base md:text-lg">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Body */}
        <PostBody post={post} />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-brand-neutral-100">
            <p className="section-eyebrow text-brand-neutral-400 mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
                  <Badge>{tag.name}</Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {post.faqs && post.faqs.length > 0 && (
          <FAQAccordion faqs={post.faqs} />
        )}

        {/* CTA inline */}
        <div className="mt-12 relative overflow-hidden rounded-2xl p-8 text-center gradient-brand shadow-blue">
          <p className="section-eyebrow text-white/70 mb-2">Take the next step</p>
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
            Ready to Start Your Treatment?
          </h2>
          <p className="text-white/75 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
            Book a consultation with our expert physiotherapists. No referral needed.
          </p>
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-brand-blue font-bold rounded-xl hover:bg-brand-neutral-50 transition-colors shadow-sm"
          >
            Book Appointment
          </Link>
        </div>

        {/* Related posts */}
        <RelatedPosts posts={relatedPosts} />
      </article>
    </>
  )
}
