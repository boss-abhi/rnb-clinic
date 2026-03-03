# The RNB Clinic — Plesk Deployment Checklist

Quick reference ops checklist. Full instructions in `docs/DEPLOYMENT.md`.

---

## Infrastructure

- [ ] Node.js 20 LTS installed via Plesk Node.js extension
- [ ] MySQL 8.x available and `rnbclinic_strapi` database created
- [ ] PM2 installed globally: `npm i -g pm2`
- [ ] Git installed on server

---

## Strapi CMS

- [ ] `strapi/.env` created from `.env.example` with all production values
- [ ] All secrets generated with `openssl rand -base64 32`
- [ ] `npm install && npm run build` completed without errors
- [ ] PM2 process `rnb-strapi` running: `pm2 list`
- [ ] First admin user created at `/admin`
- [ ] **Read-only API token** created in Strapi → Settings → API Tokens
- [ ] **Write-only API token** created (lead `create` scope only)
- [ ] Public registration **disabled** (Settings → Users & Permissions → Advanced)
- [ ] Public permissions set: `find`/`findOne` on all public content types
- [ ] Public `create` on `lead` only — no `find`/`findOne` for leads

---

## Seed Content

- [ ] Seed script run: `SEED_MODE=A npm run seed:a` (or Mode B for drafts)
- [ ] Services visible in Strapi admin (≥1 service)
- [ ] Hero slides visible in Strapi admin (≥1 slide)
- [ ] Site Settings populated (clinic name, phone, address, email)
- [ ] Blog posts visible (30 posts if Mode A)

---

## Next.js Frontend

- [ ] `frontend/.env.local` created from `.env.local.example`
- [ ] `STRAPI_READ_TOKEN` filled in from Step 4
- [ ] `STRAPI_WRITE_TOKEN` filled in from Step 4
- [ ] `NEXT_PUBLIC_SITE_URL=https://thernbclinic.com` set
- [ ] `npm install && npm run build` completed without errors
- [ ] PM2 process `rnb-nextjs` running: `pm2 list`
- [ ] PM2 persistence enabled: `pm2 save && pm2 startup`

---

## Plesk / Web Server

- [ ] Reverse proxy configured for `thernbclinic.com` → `:3000`
- [ ] Reverse proxy configured for `cms.thernbclinic.com` → `:1337`
- [ ] **Force HTTPS** redirect enabled in Plesk Hosting Settings
- [ ] Let's Encrypt SSL issued for `thernbclinic.com` + `www.thernbclinic.com`
- [ ] Let's Encrypt SSL issued for `cms.thernbclinic.com`
- [ ] SSL grade verified at ssllabs.com (target **A**)

---

## Smoke Tests

- [ ] `https://thernbclinic.com` loads — no HTTP redirect loop
- [ ] `https://thernbclinic.com/sitemap.xml` returns valid XML with all pages
- [ ] `https://thernbclinic.com/robots.txt` shows correct allow/disallow rules
- [ ] Homepage loads CMS content (hero slide, services grid)
- [ ] Blog listing shows posts
- [ ] Single blog post loads with correct title/meta
- [ ] Service detail page loads
- [ ] Contact form submits → lead created in Strapi admin
- [ ] Appointment form submits → lead created in Strapi admin
- [ ] Strapi admin accessible at `https://cms.thernbclinic.com/admin`
- [ ] No frontend link to Strapi admin
- [ ] Security headers present (check with curl or browser DevTools):
  - `Content-Security-Policy`
  - `Strict-Transport-Security`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Permissions-Policy`

---

## SEO / Analytics

- [ ] `https://thernbclinic.com/sitemap.xml` submitted to Google Search Console
- [ ] Google Search Console property verified
- [ ] `NEXT_PUBLIC_GA_ID` set in `.env.local` (if analytics required)
- [ ] Lighthouse run on homepage: **Performance ≥90, SEO ≥95, Accessibility ≥95**

---

## Security

- [ ] `.env` and `.env.local` NOT committed to Git: `git check-ignore -v .env`
- [ ] Strapi admin password changed from seed default
- [ ] Test leads created during QA deleted from Strapi admin
- [ ] `npm audit` run in both `frontend/` and `strapi/` — no critical/high vulnerabilities

---

## Post-Go-Live

- [ ] Monitor PM2 logs: `pm2 logs`
- [ ] Set up PM2 log rotation: `pm2 install pm2-logrotate`
- [ ] Schedule regular `git pull` + rebuild for content-only updates, or configure Strapi webhooks to trigger ISR revalidation
