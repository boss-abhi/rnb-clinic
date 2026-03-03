import { createAndPublish } from '../client'

export const BLOG_TAGS = [
  { name: 'physiotherapy', slug: 'physiotherapy' },
  { name: 'physiotherapy basics', slug: 'physiotherapy-basics' },
  { name: 'ranchi', slug: 'ranchi' },
  { name: 'back pain', slug: 'back-pain' },
  { name: 'spine', slug: 'spine' },
  { name: 'neck pain', slug: 'neck-pain' },
  { name: 'cervical spondylosis', slug: 'cervical-spondylosis' },
  { name: 'sports injury', slug: 'sports-injury' },
  { name: 'rehabilitation', slug: 'rehabilitation' },
  { name: 'knee pain', slug: 'knee-pain' },
  { name: 'joints', slug: 'joints' },
  { name: 'frozen shoulder', slug: 'frozen-shoulder' },
  { name: 'shoulder', slug: 'shoulder' },
  { name: 'sciatica', slug: 'sciatica' },
  { name: 'post-surgery', slug: 'post-surgery' },
  { name: 'stroke', slug: 'stroke' },
  { name: 'neurological', slug: 'neurological' },
  { name: 'cerebral palsy', slug: 'cerebral-palsy' },
  { name: 'paediatric', slug: 'paediatric' },
  { name: 'elderly', slug: 'elderly' },
  { name: 'posture', slug: 'posture' },
  { name: 'plantar fasciitis', slug: 'plantar-fasciitis' },
  { name: 'foot pain', slug: 'foot-pain' },
  { name: 'carpal tunnel', slug: 'carpal-tunnel' },
  { name: 'tennis elbow', slug: 'tennis-elbow' },
  { name: 'dry needling', slug: 'dry-needling' },
  { name: 'acupuncture', slug: 'acupuncture' },
  { name: 'tens therapy', slug: 'tens-therapy' },
  { name: 'ultrasound therapy', slug: 'ultrasound-therapy' },
  { name: 'electrotherapy', slug: 'electrotherapy' },
  { name: 'core strengthening', slug: 'core-strengthening' },
  { name: 'pregnancy', slug: 'pregnancy' },
  { name: "women's health", slug: 'womens-health' },
  { name: 'arthritis', slug: 'arthritis' },
  { name: 'copd', slug: 'copd' },
  { name: 'respiratory', slug: 'respiratory' },
  { name: 'headache', slug: 'headache' },
  { name: 'balance', slug: 'balance' },
  { name: 'vestibular', slug: 'vestibular' },
  { name: 'manual therapy', slug: 'manual-therapy' },
  { name: 'exercise therapy', slug: 'exercise-therapy' },
]

export async function seedTags(): Promise<void> {
  console.log('\n[core] Seeding blog tags…')
  for (const tag of BLOG_TAGS) {
    await createAndPublish('tag', tag, 'name')
    console.log(`  ✓ Tag: "${tag.name}"`)
  }
}
