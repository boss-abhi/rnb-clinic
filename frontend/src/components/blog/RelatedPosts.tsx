import type { BlogPost } from '@/types/strapi'
import PostCard from './PostCard'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="mt-16 pt-10 border-t border-brand-neutral-100" aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" className="text-2xl font-bold text-brand-neutral-900 mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
