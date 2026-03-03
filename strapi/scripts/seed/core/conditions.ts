import { createAndPublish, getId } from '../client'

const conditions = [
  { name: 'Lower Back Pain', slug: 'lower-back-pain', services: ['Back & Spine Treatment', 'Dry Needling & Manual Therapy'], short_description: 'Acute or chronic pain in the lumbar region, often caused by muscle strain, disc problems, or poor posture.' },
  { name: 'Cervical Spondylosis', slug: 'cervical-spondylosis', services: ['Neck & Shoulder Pain Management'], short_description: 'Age-related wear of the cervical spine causing neck pain, stiffness, and sometimes arm pain or numbness.' },
  { name: 'Frozen Shoulder', slug: 'frozen-shoulder', services: ['Neck & Shoulder Pain Management', 'Electrotherapy & Ultrasound'], short_description: 'Painful stiffness and restricted movement of the shoulder joint, progressing through freezing, frozen, and thawing phases.' },
  { name: 'Tennis Elbow', slug: 'tennis-elbow', services: ['Sports Injury Recovery', 'Dry Needling & Manual Therapy'], short_description: 'Lateral epicondylitis — overuse injury causing pain and tenderness on the outer part of the elbow.' },
  { name: 'Knee Osteoarthritis', slug: 'knee-osteoarthritis', services: ['Knee & Joint Rehabilitation', 'Electrotherapy & Ultrasound'], short_description: 'Degenerative joint disease causing knee pain, stiffness, and swelling — most common in adults over 50.' },
  { name: 'Sciatica', slug: 'sciatica', services: ['Back & Spine Treatment'], short_description: 'Pain radiating along the sciatic nerve from the lower back through the hip and down the leg.' },
  { name: 'Plantar Fasciitis', slug: 'plantar-fasciitis', services: ['Sports Injury Recovery', 'Dry Needling & Manual Therapy'], short_description: 'Inflammation of the plantar fascia causing heel pain, especially on first steps in the morning.' },
  { name: 'Carpal Tunnel Syndrome', slug: 'carpal-tunnel-syndrome', services: ['Electrotherapy & Ultrasound', 'Dry Needling & Manual Therapy'], short_description: 'Compression of the median nerve at the wrist causing numbness, tingling, and weakness in the hand.' },
  { name: 'Stroke', slug: 'stroke', services: ['Stroke & Neurological Rehabilitation'], short_description: 'Brain injury caused by interrupted blood supply, often resulting in weakness, paralysis, and impaired movement.' },
  { name: 'Cerebral Palsy', slug: 'cerebral-palsy', services: ['Paediatric Physiotherapy', 'Stroke & Neurological Rehabilitation'], short_description: 'A group of disorders affecting movement, muscle tone, and posture caused by brain damage before or after birth.' },
  { name: "Parkinson's Disease", slug: 'parkinsons-disease', services: ['Stroke & Neurological Rehabilitation'], short_description: 'Progressive nervous system disorder affecting movement, causing tremors, stiffness, and balance problems.' },
  { name: 'Scoliosis', slug: 'scoliosis', services: ['Back & Spine Treatment', 'Paediatric Physiotherapy'], short_description: 'Abnormal lateral curvature of the spine, commonly diagnosed in adolescents during growth spurts.' },
  { name: 'Disc Herniation (Slipped Disc)', slug: 'disc-herniation', services: ['Back & Spine Treatment'], short_description: 'Rupture of the intervertebral disc causing nerve compression, leading to back pain and radiating limb symptoms.' },
  { name: 'Whiplash Injury', slug: 'whiplash-injury', services: ['Neck & Shoulder Pain Management'], short_description: 'Neck strain from rapid forward-backward movement, commonly from road traffic accidents.' },
  { name: 'ACL Injury', slug: 'acl-injury', services: ['Sports Injury Recovery', 'Knee & Joint Rehabilitation', 'Post-Surgical Rehabilitation'], short_description: 'Tear of the anterior cruciate ligament in the knee, typically from sports with sudden direction changes.' },
  { name: 'Rheumatoid Arthritis', slug: 'rheumatoid-arthritis', services: ['Knee & Joint Rehabilitation', 'Electrotherapy & Ultrasound'], short_description: 'Autoimmune inflammatory arthritis causing joint pain, swelling, and progressive deformity.' },
  { name: 'COPD & Respiratory Conditions', slug: 'copd-respiratory', services: ['Electrotherapy & Ultrasound'], short_description: 'Chronic obstructive pulmonary disease and other respiratory conditions managed with breathing exercises and chest physiotherapy.' },
  { name: 'Vertigo (BPPV)', slug: 'vertigo-bppv', services: ['Stroke & Neurological Rehabilitation'], short_description: 'Benign paroxysmal positional vertigo causing brief episodes of dizziness triggered by head movements.' },
  { name: 'Fibromyalgia', slug: 'fibromyalgia', services: ['Back & Spine Treatment', 'Dry Needling & Manual Therapy'], short_description: 'Widespread musculoskeletal pain accompanied by fatigue, sleep, and cognitive issues.' },
  { name: 'Posture Correction', slug: 'posture-correction', services: ['Back & Spine Treatment', 'Neck & Shoulder Pain Management'], short_description: 'Assessment and correction of poor posture patterns causing chronic pain, especially in desk workers.' },
]

export async function seedConditions(): Promise<void> {
  console.log('\n[core] Seeding conditions…')
  for (const cond of conditions) {
    const { services, ...data } = cond
    const serviceIds = services.map(name => getId('service', name))
    await createAndPublish(
      'condition',
      { ...data, related_services: serviceIds },
      'name'
    )
    console.log(`  ✓ Condition: "${cond.name}"`)
  }
}
