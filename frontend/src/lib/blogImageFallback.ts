import type { BlogPost } from '@/types/strapi'

export function getBlogFallbackImage(post: Pick<BlogPost, 'slug'>): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${basePath}/blog-images/${post.slug}.png`
}
