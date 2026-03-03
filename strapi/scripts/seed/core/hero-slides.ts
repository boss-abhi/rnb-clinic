import { createAndPublish } from '../client'

const slides = [
  {
    title: 'Expert Physiotherapy in Ranchi',
    subtitle:
      'Evidence-based treatment for pain relief, sports injury, neuro rehab and post-surgical recovery. Book your consultation today.',
    cta_text: 'Book Appointment',
    cta_link: '/book-appointment',
    order: 1,
    active: true,
  },
  {
    title: 'Your Recovery Starts Here',
    subtitle:
      'Personalised physiotherapy programmes designed around your condition, your goals, and your lifestyle.',
    cta_text: 'Our Services',
    cta_link: '/services',
    order: 2,
    active: true,
  },
  {
    title: 'Trusted Care, Proven Results',
    subtitle:
      'With experienced physiotherapists and modern techniques, The RNB Clinic is Ranchi\'s destination for rehabilitation and wellness.',
    cta_text: 'Learn More',
    cta_link: '/about',
    order: 3,
    active: true,
  },
]

export async function seedHeroSlides(): Promise<void> {
  console.log('\n[core] Seeding hero slides…')
  for (const slide of slides) {
    await createAndPublish('hero-slide', slide, 'title')
    console.log(`  ✓ Slide: "${slide.title}"`)
  }
}
