import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPosts, getCategories } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import PostCard from '@/components/blog/PostCard'
import SectionHeader from '@/components/ui/SectionHeader'

export const revalidate = 120

export async function generateStaticParams() {
  try {
    const res = await getCategories()
    return (res.data || []).map((c) => ({ slug: c.slug }))
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
    const res = await getCategories()
    const cat = res.data.find((c) => c.slug === slug)
    if (!cat) return {}
    return buildMetadata({
      title: `${cat.name} Physiotherapy Articles, Clinical Insights & Rehabilitation Education`,
      description: cat.description || `Browse physiotherapy articles in the ${cat.name} category from The RNB Clinic, Ranchi.`,
      path: `/blog/category/${slug}`,
      keywords: [
        `${cat.name} physiotherapy articles`,
        'rehab education resources',
        'evidence based treatment information',
      ],
    })
  } catch {
    return {}
  }
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params

  const [postsRes, catsRes] = await Promise.allSettled([
    getBlogPosts({ 'filters[categories][slug][$eq]': slug, 'pagination[pageSize]': 20 }),
    getCategories(),
  ])

  const posts = postsRes.status === 'fulfilled' ? postsRes.value.data : []
  const categories = catsRes.status === 'fulfilled' ? catsRes.value.data : []
  const category = categories.find((c) => c.slug === slug)

  if (!category && categories.length > 0) notFound()

  return (
    <>
      <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-green-light text-sm font-semibold uppercase tracking-wider mb-2">Category</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">{category?.name || slug}</h1>
          {category?.description && <p className="mt-3 text-white/70 text-lg max-w-xl">{category.description}</p>}
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
            <p>No articles in this category yet. Check back soon.</p>
          </div>
        )}
      </div>
    </>
  )
}
