import { upsertSingleType } from '../client'

export async function seedSiteSettings(): Promise<void> {
  console.log('\n[core] Seeding site settings…')
  await upsertSingleType('site-setting', {
    clinic_name: 'The RNB Clinic',
    tagline: 'Expert Physiotherapy & Rehabilitation in Ranchi',
    meta_description:
      'The RNB Clinic in Ranchi, Jharkhand delivers physiotherapy for back and neck pain, sports injuries, post-surgery rehab, stroke recovery, joint mobility, posture correction, preventive care with expert therapists, modern techniques, and personalized plans.',
    phone: '+91 70424 90276',
    whatsapp: '+91 70424 90276',
    email: 'thernbclinic@gmail.com',
    appointment_email: 'appointments@thernbclinic.com',
    address:
      'The RNB Clinic, 45 Circular Road, Near HEC Colony, Dhurwa, Ranchi — 834004, Jharkhand, India',
    google_maps_iframe:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.12!2d85.3096!3d23.3441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDIwJzM4LjgiTiA4NcKwMTgnMzQuNiJF!5e0!3m2!1sen!2sin!4v1234567890" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    facebook_url: 'https://www.facebook.com/thernbclinic',
    instagram_url: 'https://www.instagram.com/thernbclinic',
    instagram_reels: [
      'https://www.instagram.com/reel/DU8VYo5jYBE/',
      'https://www.instagram.com/reel/DUn6UsaCV0i/',
      'https://www.instagram.com/reel/DUVymDRlXJn/',
    ].join('\n'),
    youtube_url: 'https://www.youtube.com/@thernbclinic',
    footer_tagline: 'Helping Ranchi recover, move, and live better.',
    smtp_configured: false,
  })
  console.log('  ✓ Site settings seeded')
}
