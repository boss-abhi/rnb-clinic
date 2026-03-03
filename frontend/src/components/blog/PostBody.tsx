import type { BlogPost } from '@/types/strapi'
import BlocksRenderer from './BlocksRenderer'

interface PostBodyProps {
  post: BlogPost
}

export default function PostBody({ post }: PostBodyProps) {
  if (!post.content) {
    return (
      <p className="text-brand-neutral-900/60">Content coming soon.</p>
    )
  }

  return (
    <BlocksRenderer content={post.content as object[]} />
  )
}
