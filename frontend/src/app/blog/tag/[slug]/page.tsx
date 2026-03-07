import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPosts, getTags } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import PostCard from '@/components/blog/PostCard'

export const revalidate = 120

export async function generateStaticParams() {
  try {
    const res = await getTags()
    return (res.data || []).map((t) => ({ slug: t.slug }))
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
    const res = await getTags()
    const tag = res.data.find((t) => t.slug === slug)
    if (!tag) return {}
    return buildMetadata({
      title: `${tag.name} Pain Relief Tips, Exercise Guidance & Physiotherapy Recovery Insights`,
      description: `Browse physiotherapy articles tagged "${tag.name}" from The RNB Clinic, Ranchi.`,
      path: `/blog/tag/${slug}`,
      keywords: [
        `${tag.name} physiotherapy guide`,
        'health recovery reading',
        'expert rehabilitation content',
      ],
    })
  } catch {
    return {}
  }
}

export default async function BlogTagPage({ params }: Props) {
  const { slug } = await params

  const [postsRes, tagsRes] = await Promise.allSettled([
    getBlogPosts({ 'pagination[pageSize]': 200 }),
    getTags(),
  ])

  const allPosts = postsRes.status === 'fulfilled' ? postsRes.value.data : []
  const tags = tagsRes.status === 'fulfilled' ? tagsRes.value.data : []
  const tag = tags.find((t) => t.slug === slug)
  const posts = allPosts.filter((post) => post.tags?.some((t) => t.slug === slug))

  if (!tag && tags.length > 0) notFound()

  return (
    <>
      <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-green-light text-sm font-semibold uppercase tracking-wider mb-2">Tag</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">#{tag?.name || slug}</h1>
        </div>
      </div>

      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-brand-neutral-900/40">
            <p>No articles with this tag yet. Check back soon.</p>
          </div>
        )}
      </div>
    </>
  )
}
