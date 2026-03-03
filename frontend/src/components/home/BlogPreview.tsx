import Link from 'next/link'
import type { BlogPost } from '@/types/strapi'
import PostCard from '@/components/blog/PostCard'
import SectionHeader from '@/components/ui/SectionHeader'

interface BlogPreviewProps {
  posts: BlogPost[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null

  return (
    <section className="section-padding bg-brand-neutral-50" aria-label="Latest blog articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionHeader
            eyebrow="Health Insights"
            title="Physiotherapy Knowledge Hub"
            description="Evidence-based articles, patient guides, and expert insights from our clinic team."
          />
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border-2 border-brand-blue text-brand-blue font-semibold rounded-xl hover:bg-brand-blue hover:text-white transition-all text-sm"
          >
            All Articles
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
