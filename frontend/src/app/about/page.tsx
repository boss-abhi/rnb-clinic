import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTeamMembers, getSiteSettings, getStrapiImageUrl } from '@/lib/strapi'
import { buildMetadata } from '@/lib/seo'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABanner from '@/components/home/CTABanner'

export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'About Us',
    description: 'Meet the expert physiotherapy team at The RNB Clinic, Ranchi. Learn about our mission, values, and commitment to evidence-based patient care.',
    path: '/about',
  })
}

function extractBioText(bio: unknown): string {
  if (!Array.isArray(bio)) return ''

  const text = bio
    .flatMap((block) => {
      if (!block || typeof block !== 'object') return []
      const children = (block as { children?: Array<{ text?: string }> }).children
      if (!Array.isArray(children)) return []
      return children.map((child) => child?.text || '')
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

  return text
}

type RenderTeamMember = {
  id: number
  name: string
  designation?: string | null
  qualifications?: string | null
  experience_years?: number | null
  bio?: unknown
  photoUrl?: string | null
  photo?: { alternativeText?: string | null } | null
}

const CMS_ASSIGNED_TEAM_IMAGES: Record<string, string> = {
  'dr. robins kumar': '/team/robins-cms.jpg',
  'dr. bhashkar singh': '/team/bhashkar-cms.jpg',
  'dr. nilam singh': '/team/nilam-cms.png',
}

function getAssignedTeamImage(name: string): string | null {
  return CMS_ASSIGNED_TEAM_IMAGES[name.trim().toLowerCase()] || null
}

const FALLBACK_TEAM: RenderTeamMember[] = [
  {
    id: 1,
    name: 'Dr. Bhashkar Singh',
    designation: 'Chief Physiotherapist',
    qualifications: 'MPT (Neuro), BPT',
    experience_years: 12,
    bio: [{ children: [{ text: 'Expert in neurological rehabilitation, chronic pain management, and evidence-based physiotherapy care.' }] }],
    photoUrl: '/team/bhashkar-cms.jpg',
  },
  {
    id: 2,
    name: 'Dr. Nilam Singh',
    designation: 'Senior Physiotherapist',
    qualifications: 'MPT (Ortho), BPT',
    experience_years: 10,
    bio: [{ children: [{ text: 'Specializes in orthopaedic recovery, women’s health physiotherapy, and post-surgical rehabilitation.' }] }],
    photoUrl: '/team/nilam-cms.png',
  },
  {
    id: 3,
    name: 'Dr. Robins Kumar',
    designation: 'Consultant Physiotherapist',
    qualifications: 'BPT',
    experience_years: 8,
    bio: [{ children: [{ text: 'Focuses on sports injury rehab, mobility restoration, and long-term functional recovery plans.' }] }],
    photoUrl: '/team/robins-cms.jpg',
  },
]

export default async function AboutPage() {
  const [teamRes, settingsRes] = await Promise.allSettled([
    getTeamMembers(),
    getSiteSettings(),
  ])

  const cmsTeam = teamRes.status === 'fulfilled' ? teamRes.value.data : []
  const team: RenderTeamMember[] = cmsTeam.length > 0
    ? cmsTeam.map((m) => {
        const assignedLocalPhoto = getAssignedTeamImage(m.name)
        return {
          ...m,
          photoUrl: assignedLocalPhoto || (m.photo ? getStrapiImageUrl(m.photo) : null),
        }
      })
    : FALLBACK_TEAM

  const settings = settingsRes.status === 'fulfilled' ? settingsRes.value.data : null

  return (
    <>
      {/* Hero */}
      <div className="gradient-hero py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" aria-hidden="true" />
            <span className="section-eyebrow text-brand-green-light">Our Story</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">About The RNB Clinic</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Dedicated to delivering expert, compassionate physiotherapy care to the people of Ranchi and Jharkhand since 2014.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                eyebrow="Our Story"
                title="Who We Are"
              />
              <div className="mt-6 space-y-4 text-brand-neutral-900/70 leading-relaxed">
                <p>
                  The RNB Clinic was founded with a single purpose: to make high-quality physiotherapy accessible to every patient in Ranchi. We combine clinical expertise with genuine care to help you recover faster and live better.
                </p>
                <p>
                  Our therapists use evidence-based techniques — from manual therapy and therapeutic exercise to electrotherapy and dry needling — tailored to each patient&apos;s unique needs.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Years Experience', value: '10+' },
                  { label: 'Patients Treated', value: '5,000+' },
                  { label: 'Conditions Managed', value: '50+' },
                  { label: 'Satisfaction Rate', value: '98%' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-brand-neutral-50 rounded-xl p-4 border border-brand-neutral-100">
                    <p className="text-2xl font-extrabold text-brand-blue">{stat.value}</p>
                    <p className="text-sm text-brand-neutral-900/60 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: '🎯', title: 'Our Mission', desc: 'To provide world-class physiotherapy care that restores function, relieves pain, and improves quality of life for every patient we serve.' },
                { icon: '👁️', title: 'Our Vision', desc: 'To be the most trusted physiotherapy clinic in Jharkhand, known for clinical excellence, compassionate care, and lasting patient outcomes.' },
                { icon: '💎', title: 'Our Values', desc: 'Evidence-based practice, patient dignity, continuous learning, and transparent communication are at the heart of everything we do.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-brand-neutral-50 rounded-2xl border border-brand-neutral-100">
                  <span className="text-3xl mt-1" aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-brand-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-brand-neutral-900/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-16 bg-brand-neutral-50" aria-label="Our team">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Meet the Experts"
              title="Our Physiotherapy Team"
              description="Experienced, qualified therapists who genuinely care about your recovery."
              center
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => {
                const photoUrl = member.photoUrl || null
                const bioText = extractBioText(member.bio)

                return (
                  <div key={member.id} className="bg-white rounded-2xl border border-brand-neutral-100 shadow-sm overflow-hidden text-center">
                    <div className="aspect-square relative">
                      {photoUrl ? (
                        <Image src={photoUrl} alt={member.photo?.alternativeText || member.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-blue/10 to-brand-green/10 flex items-center justify-center">
                          <span className="text-6xl font-extrabold text-brand-blue/30" aria-hidden="true">{member.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-brand-neutral-900">{member.name}</h3>
                      {member.designation && <p className="text-brand-green font-medium text-sm mt-1">{member.designation}</p>}
                      {member.qualifications && <p className="text-brand-neutral-900/50 text-xs mt-2">{member.qualifications}</p>}
                      {member.experience_years && (
                        <p className="text-brand-neutral-900/50 text-xs mt-1">{member.experience_years} years experience</p>
                      )}
                      {bioText && (
                        <p className="text-brand-neutral-900/70 text-sm leading-relaxed mt-3 line-clamp-4">
                          {bioText}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Book CTA */}
      <div className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-brand-neutral-900 mb-3">Ready to Experience the RNB Difference?</h2>
          <p className="text-brand-neutral-900/60 mb-6">Book your first consultation today and start your journey to pain-free living.</p>
          <Link href="/book-appointment" className="inline-flex px-8 py-3.5 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-dark transition-colors">
            Book Appointment
          </Link>
        </div>
      </div>

      <CTABanner phone={settings?.phone} whatsapp={settings?.whatsapp} />
    </>
  )
}
