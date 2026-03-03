import { createAndPublish } from '../client'
import { h2, h3, p, ul } from '../helpers'

const team = [
  {
    name: 'Dr. Rajiv Nair',
    slug: 'dr-rajiv-nair',
    designation: 'Chief Physiotherapist & Founder',
    qualifications: 'MPT (Orthopaedics), BPT, MIAP, Certified Dry Needling Practitioner',
    experience_years: 14,
    order: 1,
    featured: true,
    bio: [
      h2('About Dr. Rajiv Nair'),
      p('Dr. Rajiv Nair is the founder and Chief Physiotherapist at The RNB Clinic. With over 14 years of clinical experience across hospital and private practice settings, he brings expert-level skills in orthopaedic and musculoskeletal physiotherapy to every patient consultation.'),
      h3('Areas of Expertise'),
      ul(
        'Orthopaedic and musculoskeletal rehabilitation',
        'Spinal physiotherapy (cervical and lumbar)',
        'Post-surgical rehabilitation (knee, hip, shoulder)',
        'Dry needling and manual therapy',
        'Sports injury management'
      ),
      h3('Education & Training'),
      p('Dr. Nair completed his Bachelor of Physiotherapy (BPT) from Ranchi Institute of Medical Sciences and his Masters in Physiotherapy specialising in Orthopaedics from Jamia Millia Islamia, New Delhi. He holds certification in dry needling and is a member of the Indian Association of Physiotherapists (MIAP).'),
    ],
  },
  {
    name: 'Ms. Bhawna Singh',
    slug: 'ms-bhawna-singh',
    designation: 'Senior Physiotherapist — Neuro & Paediatrics',
    qualifications: 'MPT (Neurology), BPT, Certified Paediatric Physiotherapist, MIAP',
    experience_years: 9,
    order: 2,
    featured: true,
    bio: [
      h2('About Ms. Bhawna Singh'),
      p('Ms. Bhawna Singh is our Senior Physiotherapist specialising in neurological and paediatric physiotherapy. She has spent the majority of her career working with stroke survivors, children with cerebral palsy, and patients with complex neurological conditions.'),
      h3('Areas of Expertise'),
      ul(
        'Stroke and acquired brain injury rehabilitation',
        "Parkinson's disease management",
        'Paediatric physiotherapy (cerebral palsy, developmental delays)',
        'Vestibular rehabilitation and balance disorders',
        'Functional neurological disorder management'
      ),
      h3('Education & Training'),
      p('Ms. Bhawna Singh completed her BPT from Ranchi University and her Masters in Physiotherapy (Neurology) from CMC Vellore. She holds certification in paediatric physiotherapy and is an active member of the Indian Association of Physiotherapists.'),
    ],
  },
  {
    name: 'Mr. Arjun Mehta',
    slug: 'mr-arjun-mehta',
    designation: 'Sports & Exercise Physiotherapist',
    qualifications: 'BPT, Diploma in Sports Medicine, Certified Strength & Conditioning Specialist',
    experience_years: 6,
    order: 3,
    featured: false,
    bio: [
      h2('About Mr. Arjun Mehta'),
      p('Mr. Arjun Mehta leads the sports physiotherapy and exercise rehabilitation service at The RNB Clinic. He has worked with athletes across cricket, football, athletics, and combat sports, providing both injury rehabilitation and performance optimisation.'),
      h3('Areas of Expertise'),
      ul(
        'Sports injury assessment and rehabilitation',
        'Return-to-sport programming',
        'ACL and ligament injury recovery',
        'Strength and conditioning for injured athletes',
        'Running biomechanics analysis and correction'
      ),
    ],
  },
]

export async function seedTeamMembers(): Promise<void> {
  console.log('\n[core] Seeding team members…')
  for (const member of team) {
    await createAndPublish('team-member', member, 'name')
    console.log(`  ✓ Team member: "${member.name}"`)
  }
}
