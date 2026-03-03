import { createAndPublish } from '../client'

export const SERVICE_CATEGORIES = [
  {
    name: 'Musculoskeletal & Orthopaedic',
    slug: 'musculoskeletal-orthopaedic',
    description:
      'Treatment for bones, joints, muscles, and connective tissue conditions including back pain, knee pain, and sports injuries.',
  },
  {
    name: 'Neurological Rehabilitation',
    slug: 'neurological-rehabilitation',
    description:
      'Specialist physiotherapy for stroke, spinal cord injuries, Parkinson\'s disease, and other neurological conditions.',
  },
  {
    name: 'Sports & Exercise Therapy',
    slug: 'sports-exercise-therapy',
    description:
      'Evidence-based rehabilitation and performance optimisation for amateur and competitive athletes.',
  },
  {
    name: 'Paediatric Physiotherapy',
    slug: 'paediatric-physiotherapy',
    description:
      'Specialised care for children with developmental delays, cerebral palsy, and musculoskeletal conditions.',
  },
  {
    name: 'Geriatric & Preventive Care',
    slug: 'geriatric-preventive-care',
    description:
      'Physiotherapy programmes for older adults focused on falls prevention, mobility, balance, and independence.',
  },
]

export async function seedServiceCategories(): Promise<void> {
  console.log('\n[core] Seeding service categories…')
  for (const cat of SERVICE_CATEGORIES) {
    await createAndPublish('service-category', cat, 'name')
    console.log(`  ✓ Category: "${cat.name}"`)
  }
}
