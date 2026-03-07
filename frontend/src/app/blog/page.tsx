import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts, getCategories, getTags } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import PostCard from '@/components/blog/PostCard'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Physiotherapy in Ranchi, Jharkhand Blog | Expert Recovery Tips and Treatment Guides',
    description: 'Read expert articles on Physiotherapy in Ranchi, Jharkhand including pain management, movement recovery, and injury prevention. Our blog simplifies Physiotherapy in Ranchi, Jharkhand with practical advice you can apply daily.',
    path: '/blog',
    keywords: [
      'physiotherapy health blog india',
      'pain management exercise guides',
      'rehabilitation education articles',
      'expert physio tips ranchi',
    ],
  })
}

interface SearchParams {
  page?: string
}

interface Props {
  searchParams: Promise<SearchParams>
}

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam || '1', 10))
  const pageSize = 9

  const [postsRes, catsRes, tagsRes] = await Promise.allSettled([
    getBlogPosts({ 'pagination[page]': page, 'pagination[pageSize]': pageSize }),
    getCategories(),
    getTags(),
  ])

  const postsData = postsRes.status === 'fulfilled' ? postsRes.value : { data: [], meta: { pagination: { pageCount: 1, total: 0, page: 1, pageSize } } }
  const posts = postsData.data
  const pagination = postsData.meta.pagination || { pageCount: 1, total: 0, page, pageSize }
  const categories = catsRes.status === 'fulfilled' ? catsRes.value.data : []
  const tags = tagsRes.status === 'fulfilled' ? tagsRes.value.data : []

  const [featured, rest] = page === 1 && posts.length > 0 ? [posts[0], posts.slice(1)] : [null, posts]

  return (
    <>
      {/* Hero */}
      <div className="gradient-hero py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" aria-hidden="true" />
            <span className="section-eyebrow text-brand-green-light">Health Resources</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Physiotherapy Blog
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Expert advice, patient guides, and evidence-based health insights from The RNB Clinic team in Ranchi.
          </p>
        </div>
      </div>

      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Featured post */}
            {featured && (
              <div className="mb-10">
                <PostCard post={featured} featured />
              </div>
            )}

            {/* Post grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {rest.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {posts.length === 0 && (
              <div className="text-center py-20 text-brand-neutral-900/40">
                <p>No blog posts yet. Check back soon.</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.pageCount > 1 && (
              <nav className="mt-10 flex justify-center gap-2" aria-label="Blog pagination">
                {page > 1 && (
                  <Link href={`/blog?page=${page - 1}`} className="px-4 py-2 rounded-lg border border-brand-neutral-100 text-sm font-medium hover:border-brand-blue hover:text-brand-blue transition-colors">
                    Previous
                  </Link>
                )}
                {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-brand-blue text-white' : 'border border-brand-neutral-100 hover:border-brand-blue hover:text-brand-blue'}`}
                    aria-current={p === page ? 'page' : undefined}
                  >
                    {p}
                  </Link>
                ))}
                {page < pagination.pageCount && (
                  <Link href={`/blog?page=${page + 1}`} className="px-4 py-2 rounded-lg border border-brand-neutral-100 text-sm font-medium hover:border-brand-blue hover:text-brand-blue transition-colors">
                    Next
                  </Link>
                )}
              </nav>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 space-y-8">
            {categories.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-neutral-900/40 mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/blog/category/${cat.slug}`}>
                      <Badge variant="blue">{cat.name}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {tags.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-neutral-900/40 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
                      <Badge>{tag.name}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-5">
              <h3 className="font-bold text-brand-neutral-900 mb-2">Book an Appointment</h3>
              <p className="text-sm text-brand-neutral-900/60 mb-4">Have questions about your condition? Our experts are here to help.</p>
              <Link href="/book-appointment" className="block text-center px-4 py-2.5 bg-brand-blue text-white text-sm font-semibold rounded-xl hover:bg-brand-blue-dark transition-colors">
                Book Now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
