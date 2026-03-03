# The RNB Clinic — Website

**thernbclinic.com** — Physiotherapy clinic website built with Next.js + Strapi CE.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4 |
| CMS | Strapi CE 5 |
| Database | MySQL 8 (production) / SQLite (dev) |
| Hosting | Plesk with PM2 + Apache/Nginx reverse proxy |
| SSL | Let's Encrypt |

---

## Project Structure

```
rnb-clinic/
├── frontend/          # Next.js app (port 3000)
├── strapi/            # Strapi CMS (port 1337)
└── docs/
    ├── DEPLOYMENT.md      # Full deployment guide
    └── PLESK_CHECKLIST.md # Ops checklist
```

---

## Local Development

### 1. Strapi CMS

```bash
cd strapi
cp .env.example .env
# Edit .env — DATABASE_CLIENT=sqlite is fine for local dev
npm install
npm run develop
# Strapi runs at http://localhost:1337
# Admin panel: http://localhost:1337/admin
```

### 2. Next.js Frontend

```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local — add your Strapi read/write tokens
npm install
npm run dev
# Site runs at http://localhost:3000/rnb-clinic
# Admin is proxied at http://localhost:3000/rnb-clinic/admin
```

### 3. Seed Content (optional, after Strapi is running)

```bash
cd strapi

# Full content — 30 published blog posts:
SEED_MODE=A npm run seed:a

# Outline drafts — 30 draft blog posts (fill in before publishing):
SEED_MODE=B npm run seed:b
```

---

## Key Pages

| URL | Description |
|---|---|
| `/` | Homepage — hero, services, testimonials, blog preview |
| `/about` | About us, team members |
| `/services` | Services listing |
| `/services/[slug]` | Service detail |
| `/conditions-treated` | Conditions grid |
| `/testimonials` | Patient testimonials |
| `/blog` | Blog listing (paginated) |
| `/blog/[slug]` | Blog post with FAQ accordion |
| `/blog/category/[slug]` | Posts by category |
| `/blog/tag/[slug]` | Posts by tag |
| `/contact` | Contact form + map |
| `/book-appointment` | Appointment booking form |

---

## Content Model (Strapi)

Collections: `service`, `service-category`, `condition`, `blog-post`, `category`, `tag`, `testimonial`, `team-member`, `lead`, `hero-slide`

Single types: `site-setting`

Shared component: `shared.faq`

---

## Environment Variables

### `frontend/.env.local`

```env
NEXT_PUBLIC_SITE_URL=https://thernbclinic.com
STRAPI_API_URL=http://localhost:1337
STRAPI_READ_TOKEN=your-read-only-token
STRAPI_WRITE_TOKEN=your-write-only-token
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # optional
```

### `strapi/.env`

See `strapi/.env.example` for full list.

---

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for full step-by-step guide.

Quick ops checklist: [`docs/PLESK_CHECKLIST.md`](docs/PLESK_CHECKLIST.md)

---

## Build Commands

```bash
# Frontend
cd frontend && npm run build   # production build
cd frontend && npm run lint    # ESLint

# Strapi
cd strapi && npm run build     # production build
```
