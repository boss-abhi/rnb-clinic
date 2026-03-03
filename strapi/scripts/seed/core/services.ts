import { createAndPublish, getId } from '../client'
import { h2, h3, p, ul, ol } from '../helpers'

const services = [
  {
    name: 'Back & Spine Treatment',
    slug: 'back-spine-treatment',
    category: 'Musculoskeletal & Orthopaedic',
    short_description:
      'Comprehensive physiotherapy for lower back pain, disc herniation, sciatica, and spinal rehabilitation.',
    seo_title: 'Back & Spine Treatment | The RNB Clinic Ranchi',
    seo_description:
      'Expert back pain and spine treatment at The RNB Clinic, Ranchi. Evidence-based physiotherapy for disc herniation, sciatica, spondylosis and more.',
    order: 1,
    featured: true,
    content: [
      h2('Expert Back & Spine Physiotherapy in Ranchi'),
      p('Back pain is one of the most common reasons people seek physiotherapy. At The RNB Clinic, our specialised spinal physiotherapy programme addresses the root cause of your pain — not just the symptoms.'),
      h3('Conditions We Treat'),
      ul(
        'Lower back pain (acute and chronic)',
        'Disc herniation and slipped disc',
        'Sciatica and referred leg pain',
        'Cervical and lumbar spondylosis',
        'Spinal stenosis',
        'Post-spinal surgery rehabilitation',
        'Sacroiliac joint dysfunction'
      ),
      h3('Our Approach'),
      p('We combine manual therapy, targeted exercise prescription, postural correction, and electrotherapy to create a comprehensive treatment programme tailored to your specific condition and recovery goals.'),
      h3('Treatment Techniques'),
      ul(
        'McKenzie Method assessment and exercise',
        'Maitland mobilisation and manipulation',
        'Core stabilisation and strengthening',
        'TENS and interferential therapy',
        'Therapeutic ultrasound',
        'Dry needling for myofascial trigger points',
        'Ergonomic advice and posture education'
      ),
      p('Most patients see significant improvement within 4–8 weeks of consistent treatment. Our physiotherapists work closely with your treating doctor to ensure coordinated care.'),
    ],
  },
  {
    name: 'Neck & Shoulder Pain Management',
    slug: 'neck-shoulder-pain-management',
    category: 'Musculoskeletal & Orthopaedic',
    short_description:
      'Specialist treatment for cervical spondylosis, frozen shoulder, rotator cuff injuries, and neck pain.',
    seo_title: 'Neck & Shoulder Pain Treatment | The RNB Clinic Ranchi',
    seo_description:
      'Relieve neck pain and shoulder stiffness with expert physiotherapy at The RNB Clinic, Ranchi. Treating frozen shoulder, cervical spondylosis, and rotator cuff injuries.',
    order: 2,
    featured: true,
    content: [
      h2('Neck & Shoulder Physiotherapy in Ranchi'),
      p('Neck and shoulder problems can significantly impact your daily life, from desk work to sleep. Our experienced physiotherapists provide targeted treatment to restore movement and eliminate pain.'),
      h3('Common Conditions Treated'),
      ul(
        'Cervical spondylosis and neck pain',
        'Frozen shoulder (adhesive capsulitis)',
        'Rotator cuff tears and tendinopathy',
        'Shoulder impingement syndrome',
        'Whiplash associated disorders',
        'Thoracic outlet syndrome',
        'Brachialgia and arm pain'
      ),
      h3('Treatment Methods'),
      p('We use a combination of joint mobilisation, soft tissue release, exercise therapy, and electrotherapy to restore full range of motion and function in your neck and shoulder.'),
    ],
  },
  {
    name: 'Knee & Joint Rehabilitation',
    slug: 'knee-joint-rehabilitation',
    category: 'Musculoskeletal & Orthopaedic',
    short_description:
      'Physiotherapy for knee pain, osteoarthritis, ligament injuries, and post-joint replacement recovery.',
    seo_title: 'Knee & Joint Rehabilitation | The RNB Clinic Ranchi',
    seo_description:
      'Effective knee pain relief and joint rehabilitation at The RNB Clinic, Ranchi. Specialists in ACL recovery, osteoarthritis, and post-surgery rehab.',
    order: 3,
    featured: true,
    content: [
      h2('Knee & Joint Physiotherapy in Ranchi'),
      p('Knee and joint conditions can limit your ability to walk, climb stairs, and enjoy everyday activities. Our targeted rehabilitation programmes help you regain strength, stability, and confidence.'),
      h3('Conditions We Specialise In'),
      ul(
        'Knee osteoarthritis',
        'ACL and ligament injuries',
        'Meniscal tears and patellofemoral syndrome',
        'Post total knee replacement rehab',
        'Hip osteoarthritis and hip replacement recovery',
        'Ankle sprains and instability',
        'Rheumatoid arthritis joint management'
      ),
      h3('Our Rehabilitation Approach'),
      p('We design progressive exercise programmes that rebuild muscle strength around affected joints, improve proprioception, and restore functional movement patterns for your specific goals.'),
    ],
  },
  {
    name: 'Sports Injury Recovery',
    slug: 'sports-injury-recovery',
    category: 'Sports & Exercise Therapy',
    short_description:
      'Fast-track rehabilitation for sports injuries to get athletes back to peak performance safely.',
    seo_title: 'Sports Injury Physiotherapy | The RNB Clinic Ranchi',
    seo_description:
      'Sports injury rehabilitation at The RNB Clinic Ranchi. Expert physiotherapy for ACL injuries, tennis elbow, muscle strains and sports performance recovery.',
    order: 4,
    featured: true,
    content: [
      h2('Sports Injury Rehabilitation in Ranchi'),
      p('Whether you\'re a weekend runner or a competitive athlete, sports injuries need expert management to ensure full recovery and prevent re-injury. Our sports physiotherapy team combines the latest evidence-based techniques with sport-specific rehabilitation.'),
      h3('Injuries We Treat'),
      ul(
        'Hamstring, quad, and calf muscle strains',
        'ACL, PCL, and knee ligament injuries',
        'Tennis elbow and golfer\'s elbow',
        'Plantar fasciitis and Achilles tendinopathy',
        'Shoulder dislocations and labral tears',
        'Stress fractures and shin splints',
        'Hip flexor and groin strains'
      ),
      h3('Return to Sport Programme'),
      p('Our structured return-to-sport protocol ensures you\'re physically and psychologically ready before returning to competition. We use functional movement screening, strength testing, and sport-specific drills to verify readiness.'),
    ],
  },
  {
    name: 'Stroke & Neurological Rehabilitation',
    slug: 'stroke-neurological-rehabilitation',
    category: 'Neurological Rehabilitation',
    short_description:
      'Specialist neuro-physiotherapy for stroke survivors, Parkinson\'s disease, and spinal cord injury recovery.',
    seo_title: 'Stroke & Neurological Rehabilitation | The RNB Clinic Ranchi',
    seo_description:
      'Specialist neurological physiotherapy at The RNB Clinic Ranchi for stroke recovery, Parkinson\'s disease, MS, and brain injury rehabilitation.',
    order: 5,
    featured: false,
    content: [
      h2('Neurological Physiotherapy in Ranchi'),
      p('Neurological conditions require specialist physiotherapy that understands the brain\'s capacity to adapt and rewire — a property known as neuroplasticity. Our neurological rehabilitation programme harnesses this to maximise your recovery.'),
      h3('Conditions We Treat'),
      ul(
        'Stroke and hemiplegia',
        'Parkinson\'s disease',
        'Multiple sclerosis',
        'Traumatic brain injury',
        'Spinal cord injury',
        'Guillain-Barré syndrome',
        'Functional neurological disorder'
      ),
      h3('Neurological Physiotherapy Techniques'),
      p('We use evidence-based approaches including task-specific training, balance and coordination exercises, gait re-training, and constraint-induced movement therapy to restore independence and quality of life.'),
    ],
  },
  {
    name: 'Post-Surgical Rehabilitation',
    slug: 'post-surgical-rehabilitation',
    category: 'Musculoskeletal & Orthopaedic',
    short_description:
      'Structured physiotherapy recovery programmes after orthopaedic and spinal surgery.',
    seo_title: 'Post-Surgery Physiotherapy | The RNB Clinic Ranchi',
    seo_description:
      'Accelerate your recovery after orthopaedic or spinal surgery with expert physiotherapy at The RNB Clinic, Ranchi. Evidence-based protocols for knee, hip, spine, and shoulder surgery.',
    order: 6,
    featured: false,
    content: [
      h2('Post-Surgical Physiotherapy at The RNB Clinic'),
      p('Recovery after surgery requires careful, progressive rehabilitation. Our post-surgical physiotherapy programmes are designed in close collaboration with your surgeon to ensure optimal healing and return of function.'),
      h3('Surgeries We Support'),
      ul(
        'Total knee and hip replacement',
        'ACL reconstruction',
        'Rotator cuff repair',
        'Spinal fusion and discectomy',
        'Shoulder stabilisation surgery',
        'Cardiac and thoracic surgery (chest physio)',
        'Abdominal and pelvic surgery'
      ),
    ],
  },
  {
    name: 'Paediatric Physiotherapy',
    slug: 'paediatric-physiotherapy',
    category: 'Paediatric Physiotherapy',
    short_description:
      'Child-centred physiotherapy for developmental conditions, cerebral palsy, and musculoskeletal problems in children.',
    seo_title: 'Paediatric Physiotherapy | The RNB Clinic Ranchi',
    seo_description:
      'Gentle, child-centred physiotherapy for cerebral palsy, developmental delays, scoliosis, and orthopaedic conditions in children at The RNB Clinic, Ranchi.',
    order: 7,
    featured: false,
    content: [
      h2('Paediatric Physiotherapy in Ranchi'),
      p('Children are not small adults — they have unique physiological needs and respond differently to treatment. Our paediatric physiotherapy team creates engaging, play-based programmes that children enjoy while making measurable progress.'),
      h3('Conditions We Treat in Children'),
      ul(
        'Cerebral palsy (all types)',
        'Developmental coordination disorder',
        'Muscular dystrophy',
        'Scoliosis and spinal conditions',
        'Flat feet and gait abnormalities',
        'Torticollis (wry neck)',
        'Sports injuries in young athletes'
      ),
    ],
  },
  {
    name: "Women's Health Physiotherapy",
    slug: 'womens-health-physiotherapy',
    category: 'Musculoskeletal & Orthopaedic',
    short_description:
      'Specialist physiotherapy for pregnancy-related pain, pelvic floor issues, and post-natal recovery.',
    seo_title: "Women's Health Physiotherapy | The RNB Clinic Ranchi",
    seo_description:
      "Expert women's health physiotherapy at The RNB Clinic Ranchi for pregnancy back pain, pelvic floor rehabilitation, diastasis recti, and post-natal recovery.",
    order: 8,
    featured: false,
    content: [
      h2("Women's Health Physiotherapy at The RNB Clinic"),
      p('From pregnancy through to post-natal recovery and beyond, our women\'s health physiotherapists provide sensitive, expert care for the unique physiotherapy needs of women at every stage of life.'),
      h3('Services for Women'),
      ul(
        'Pregnancy-related back and pelvic pain',
        'Pelvic floor assessment and rehabilitation',
        'Diastasis recti (abdominal separation) recovery',
        'Post-caesarean scar management',
        'Stress urinary incontinence',
        'Prolapse management',
        'Osteoporosis and bone health programmes'
      ),
    ],
  },
  {
    name: 'Electrotherapy & Ultrasound',
    slug: 'electrotherapy-ultrasound',
    category: 'Musculoskeletal & Orthopaedic',
    short_description:
      'Advanced electrotherapy modalities including TENS, IFT, ultrasound, and laser therapy for pain relief.',
    seo_title: 'Electrotherapy & Ultrasound Physiotherapy | The RNB Clinic Ranchi',
    seo_description:
      'State-of-the-art electrotherapy including TENS, IFT, therapeutic ultrasound, and laser at The RNB Clinic, Ranchi for effective pain management.',
    order: 9,
    featured: false,
    content: [
      h2('Electrotherapy & Ultrasound Treatment in Ranchi'),
      p('Electrotherapy modalities are powerful adjuncts to manual therapy and exercise, accelerating tissue healing and providing significant pain relief.'),
      h3('Modalities Available'),
      ul(
        'TENS (Transcutaneous Electrical Nerve Stimulation)',
        'IFT (Interferential Therapy)',
        'Therapeutic Ultrasound (1 MHz & 3 MHz)',
        'Short Wave Diathermy (SWD)',
        'Laser Therapy (low-level)',
        'Electrical muscle stimulation (EMS)',
        'Wax bath therapy'
      ),
    ],
  },
  {
    name: 'Dry Needling & Manual Therapy',
    slug: 'dry-needling-manual-therapy',
    category: 'Musculoskeletal & Orthopaedic',
    short_description:
      'Advanced hands-on physiotherapy using dry needling, joint mobilisation, and soft tissue techniques.',
    seo_title: 'Dry Needling & Manual Therapy | The RNB Clinic Ranchi',
    seo_description:
      'Certified dry needling and manual therapy at The RNB Clinic, Ranchi for trigger point release, joint stiffness, and chronic muscle pain.',
    order: 10,
    featured: false,
    content: [
      h2('Dry Needling & Manual Therapy in Ranchi'),
      p('Manual therapy and dry needling are highly effective hands-on techniques for releasing tight muscles, restoring joint mobility, and relieving chronic pain — often providing relief that exercises alone cannot achieve.'),
      h3('Techniques We Use'),
      ul(
        'Dry needling for myofascial trigger points',
        'Maitland joint mobilisation (grades I–IV)',
        'Mulligan concept mobilisation with movement',
        'Myofascial release and deep tissue massage',
        'Instrument-assisted soft tissue mobilisation (IASTM)',
        'PNF (proprioceptive neuromuscular facilitation)',
        'Passive and active stretching techniques'
      ),
    ],
  },
]

export async function seedServices(): Promise<void> {
  console.log('\n[core] Seeding services…')
  for (const service of services) {
    const { category, ...data } = service
    const categoryId = getId('service-category', category)
    await createAndPublish('service', { ...data, category: categoryId }, 'name')
    console.log(`  ✓ Service: "${service.name}"`)
  }
}
