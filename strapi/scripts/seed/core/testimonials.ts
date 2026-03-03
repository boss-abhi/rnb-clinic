import { createAndPublish, getId } from '../client'

const testimonials = [
  {
    patient_name: 'Priya Sharma',
    designation: 'Software Engineer, Ranchi',
    content:
      'I had severe lower back pain for over two years and had visited multiple clinics without lasting relief. After just six sessions at The RNB Clinic, the pain had reduced by 80%. Dr. Nair\'s thorough assessment and personalised exercise plan made all the difference. I highly recommend this clinic to anyone suffering from back pain in Ranchi.',
    rating: 5,
    service: 'Back & Spine Treatment',
    featured: true,
  },
  {
    patient_name: 'Ramesh Kumar',
    designation: 'Retired Government Officer, Ranchi',
    content:
      'I underwent knee replacement surgery and was worried about the recovery. The team at RNB Clinic guided me through each phase with patience and expertise. Within three months, I was walking without a stick. The staff are professional, caring, and genuinely invested in your recovery.',
    rating: 5,
    service: 'Post-Surgical Rehabilitation',
    featured: true,
  },
  {
    patient_name: 'Sunita Devi',
    designation: 'Homemaker, Hazaribagh',
    content:
      'My frozen shoulder was so painful that I could not lift my arm above shoulder height. After eight weeks of physiotherapy, I have almost full movement back. Ms. Bhawna was excellent — always explaining what she was doing and why. The clinic is well-equipped and very clean.',
    rating: 5,
    service: 'Neck & Shoulder Pain Management',
    featured: true,
  },
  {
    patient_name: 'Vikram Singh',
    designation: 'Cricket Coach, Ranchi',
    content:
      'Arjun at RNB Clinic helped me recover from a hamstring strain and return to coaching within five weeks — much faster than I expected. The sports rehab programme was exactly what I needed. I now refer all my players here whenever they get injured.',
    rating: 5,
    service: 'Sports Injury Recovery',
    featured: true,
  },
  {
    patient_name: 'Meena Agarwal',
    designation: 'Teacher, Ranchi',
    content:
      'After my stroke, I had very limited movement on my right side. I had heard that neurological recovery was slow, but the team here never gave up on me. After four months of intensive physiotherapy, I can walk independently and use my right hand for most daily tasks. Truly life-changing.',
    rating: 5,
    service: 'Stroke & Neurological Rehabilitation',
    featured: true,
  },
  {
    patient_name: 'Ajay Prasad',
    designation: 'IT Professional, Jamshedpur',
    content:
      'I drive 45 minutes to reach RNB Clinic because the quality of care here is simply not available anywhere closer. My cervical spondylosis had caused constant headaches and arm numbness. After treatment, I sleep properly for the first time in years. Worth every trip.',
    rating: 5,
    service: 'Neck & Shoulder Pain Management',
    featured: false,
  },
  {
    patient_name: 'Kavita Mehta',
    designation: 'Parent of a Patient, Ranchi',
    content:
      'Our son has cerebral palsy and we had been looking for a qualified paediatric physiotherapist in Ranchi for a long time. Ms. Bhawna has been working with him for six months and the progress has been remarkable. She is brilliant with children — patient, encouraging, and highly skilled.',
    rating: 5,
    service: 'Paediatric Physiotherapy',
    featured: false,
  },
  {
    patient_name: 'Sanjay Verma',
    designation: 'Businessman, Dhanbad',
    content:
      'I had a plantar fasciitis that was so severe I could barely walk in the mornings. After a course of dry needling and ultrasound therapy combined with a home exercise programme, the pain has completely resolved. The RNB Clinic team is thorough and professional.',
    rating: 4,
    service: 'Sports Injury Recovery',
    featured: false,
  },
]

export async function seedTestimonials(): Promise<void> {
  console.log('\n[core] Seeding testimonials…')
  for (const t of testimonials) {
    const { service, ...data } = t
    const serviceId = getId('service', service)
    await createAndPublish('testimonial', { ...data, service: serviceId }, 'patient_name')
    console.log(`  ✓ Testimonial: "${t.patient_name}"`)
  }
}
