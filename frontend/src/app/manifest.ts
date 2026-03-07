import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The RNB Clinic, Ranchi',
    short_name: 'RNB Clinic',
    description: 'Expert physiotherapy clinic in Ranchi for pain management, rehabilitation, and movement recovery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0B5ED7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/rnb-clinic-logo-original.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
