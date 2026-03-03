/**
 * RNB Clinic — Strapi Seed Script Entry Point
 *
 * Usage:
 *   SEED_MODE=A STRAPI_ADMIN_PASSWORD=xxx npx ts-node scripts/seed/index.ts
 *   SEED_MODE=B STRAPI_ADMIN_PASSWORD=xxx npx ts-node scripts/seed/index.ts
 *
 * Requires a running Strapi instance: npm run develop
 * Env vars (set in strapi/.env or inline):
 *   STRAPI_URL            default: http://localhost:1337
 *   STRAPI_ADMIN_EMAIL    default: admin@thernbclinic.com
 *   STRAPI_ADMIN_PASSWORD (required)
 *   SEED_MODE             "A" (full posts, published) | "B" (outlines, drafts)
 */

import 'dotenv/config'
import { login } from './client'
import { seedSiteSettings } from './core/site-settings'
import { seedHeroSlides } from './core/hero-slides'
import { seedServiceCategories } from './core/service-categories'
import { seedServices } from './core/services'
import { seedConditions } from './core/conditions'
import { seedTeamMembers } from './core/team-members'
import { seedTestimonials } from './core/testimonials'
import { seedCategories } from './core/categories'
import { seedTags } from './core/tags'
import { seedBlogPostsModeA } from './blog-mode-a/posts'
import { seedBlogPostsModeB } from './blog-mode-b/posts'

const mode = ((process.env.SEED_MODE ?? 'A').trim().toUpperCase()) as 'A' | 'B'

if (mode !== 'A' && mode !== 'B') {
  console.error(`Invalid SEED_MODE="${mode}". Must be "A" or "B".`)
  process.exit(1)
}

async function main(): Promise<void> {
  console.log(`\n🌱  RNB Clinic Seed Script — Mode ${mode}`)
  console.log('─'.repeat(52))

  await login()

  // ── Core data (always seeded, order matters for FK deps) ────────────────
  await seedSiteSettings()
  await seedHeroSlides()
  await seedServiceCategories()
  await seedServices()        // depends on service-categories
  await seedConditions()      // depends on services
  await seedTeamMembers()
  await seedTestimonials()    // depends on services
  await seedCategories()      // blog categories
  await seedTags()            // blog tags

  // ── Blog posts ──────────────────────────────────────────────────────────
  if (mode === 'A') {
    await seedBlogPostsModeA()  // 30 full posts, published
  } else {
    await seedBlogPostsModeB()  // 30 outlines, draft (publishedAt: null)
  }

  console.log(`\n✅  Seed complete — Mode ${mode}`)
  console.log('─'.repeat(52))
}

main().catch((err: unknown) => {
  console.error('\n❌  Seed failed:', err)
  process.exit(1)
})
