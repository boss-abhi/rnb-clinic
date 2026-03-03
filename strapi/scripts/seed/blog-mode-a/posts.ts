/**
 * Mode A — 30 fully written blog posts (published).
 * Each post has real content (~800–1200 words), 5 FAQs, categories, tags, SEO fields.
 */

import { createAndPublish } from '../client'
import { getId } from '../client'
import { postsModeA_1_15 } from './posts-1-15'
import { postsModeA_16_30 } from './posts-16-30'
export type { BlogPostSeedA } from './posts-1-15'

const allPosts = [...postsModeA_1_15, ...postsModeA_16_30]

export async function seedBlogPostsModeA(): Promise<void> {
  console.log('\n[blog-mode-a] Seeding 30 full blog posts…')
  let count = 0
  for (const post of allPosts) {
    const { categories, tags, featured_image_suggestion, ...rest } = post

    // Resolve category IDs
    const categoryIds = categories.map((name: string) => getId('category', name))

    // Resolve tag IDs
    const tagIds = tags.map((name: string) => getId('tag', name))

    await createAndPublish(
      'blog-post',
      {
        ...rest,
        categories: categoryIds,
        tags: tagIds,
      },
      'title'
    )
    count++
    console.log(`  ✓ [${count}/30] "${post.title}"`)
  }
  console.log(`  → Mode A: ${count} posts published`)
}
