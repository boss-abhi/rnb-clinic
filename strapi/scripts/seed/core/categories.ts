import { createAndPublish } from '../client'

export const BLOG_CATEGORIES = [
  {
    name: 'Physiotherapy Basics',
    slug: 'physiotherapy-basics',
    description:
      'Educational articles explaining physiotherapy concepts, techniques, and what to expect during treatment.',
  },
  {
    name: 'Back & Spine',
    slug: 'back-spine',
    description:
      'Expert articles on back pain, disc conditions, sciatica, spondylosis, and spinal health.',
  },
  {
    name: 'Sports & Rehabilitation',
    slug: 'sports-rehabilitation',
    description:
      'Sports injury management, rehabilitation protocols, and performance optimisation through physiotherapy.',
  },
  {
    name: 'Neuro & Paediatric',
    slug: 'neuro-paediatric',
    description:
      'Neurological rehabilitation for stroke, Parkinson\'s, and paediatric physiotherapy for children.',
  },
  {
    name: 'Health & Lifestyle',
    slug: 'health-lifestyle',
    description:
      'Practical advice on posture, exercise, pain prevention, and healthy lifestyle choices for everyday people.',
  },
  {
    name: 'Local Ranchi Health',
    slug: 'local-ranchi-health',
    description:
      'Physiotherapy resources, clinic guides, and health information specific to Ranchi and Jharkhand.',
  },
]

export async function seedCategories(): Promise<void> {
  console.log('\n[core] Seeding blog categories…')
  for (const cat of BLOG_CATEGORIES) {
    await createAndPublish('category', cat, 'name')
    console.log(`  ✓ Category: "${cat.name}"`)
  }
}
