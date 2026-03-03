# The RNB Clinic — Deployment Guide

**Stack:** Next.js · Strapi CE · MySQL 8 · PM2 · Plesk (Apache/Nginx reverse proxy) · Let's Encrypt SSL

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 20 LTS |
| npm | 10+ |
| MySQL | 8.x |
| PM2 | Latest (`npm i -g pm2`) |
| Git | Any recent version |

---

## Step 1 — MySQL Database

```sql
CREATE DATABASE rnbclinic_strapi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'rnbclinic'@'localhost' IDENTIFIED BY '<strong-password>';
GRANT ALL PRIVILEGES ON rnbclinic_strapi.* TO 'rnbclinic'@'localhost';
FLUSH PRIVILEGES;
```

---

## Step 2 — Clone Repository

```bash
cd /var/www/vhosts/thernbclinic.com/
git clone <your-repo-url> rnb-clinic
cd rnb-clinic
```

---

## Step 3 — Configure and Build Strapi

```bash
cd strapi
cp .env.example .env
nano .env   # fill in all production values (see below)
npm install
npm run build
```

**`strapi/.env` (production values)**

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=<openssl rand -base64 32>,<openssl rand -base64 32>
API_TOKEN_SALT=<openssl rand -base64 32>
ADMIN_JWT_SECRET=<openssl rand -base64 32>
TRANSFER_TOKEN_SALT=<openssl rand -base64 32>
JWT_SECRET=<openssl rand -base64 32>

DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=rnbclinic_strapi
DATABASE_USERNAME=rnbclinic
DATABASE_PASSWORD=<strong-password>
DATABASE_SSL=false

STRAPI_ADMIN_EMAIL=admin@thernbclinic.com
STRAPI_ADMIN_PASSWORD=<strong-admin-password>

SMTP_HOST=mail.thernbclinic.com
SMTP_PORT=465
SMTP_USERNAME=noreply@thernbclinic.com
SMTP_PASSWORD=<smtp-password>
SMTP_FROM=noreply@thernbclinic.com
NOTIFICATION_EMAIL=info@thernbclinic.com
```

### Start Strapi with PM2

Create `strapi/ecosystem.config.cjs`:

```js
module.exports = {
  apps: [{
    name: 'rnb-strapi',
    cwd: '/var/www/vhosts/thernbclinic.com/rnb-clinic/strapi',
    script: 'npm',
    args: 'run start',
    env_production: { NODE_ENV: 'production' },
  }]
}
```

```bash
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup   # follow instructions to enable on server reboot
```

---

## Step 4 — Strapi First-Run Admin Setup

1. Open `https://cms.thernbclinic.com/admin` (or your Strapi URL)
2. Create the first admin user (use credentials from `.env`)
3. Go to **Settings → API Tokens** → Create two tokens:
   - **Read-only token** — scope: `find` + `findOne` on all content types
   - **Write-only token** — scope: `create` on `lead` only
4. Copy both tokens — you'll need them for Next.js `.env.local`
5. Go to **Settings → Users & Permissions → Advanced Settings** → Disable public registration

---

## Step 5 — Set Strapi Public Permissions

In **Settings → Users & Permissions → Roles → Public**, enable `find` and `findOne` on:
- services, service-categories, conditions, blog-posts, categories, tags, testimonials, team-members, hero-slides, site-setting

Enable `create` only on `lead` (no `find`/`findOne` for leads).

---

## Step 6 — Run Seed Script

```bash
cd /var/www/vhosts/thernbclinic.com/rnb-clinic/strapi

# Mode A — 30 full blog posts, published:
SEED_MODE=A STRAPI_ADMIN_PASSWORD=<your-admin-password> npm run seed:a

# Mode B — 30 outline drafts (fill in content before publishing):
SEED_MODE=B STRAPI_ADMIN_PASSWORD=<your-admin-password> npm run seed:b
```

---

## Step 7 — Configure and Build Next.js

```bash
cd /var/www/vhosts/thernbclinic.com/rnb-clinic/frontend
cp .env.local.example .env.local
nano .env.local   # fill in values
npm install
npm run build
```

**`frontend/.env.local` (production)**

```env
NEXT_PUBLIC_SITE_URL=https://thernbclinic.com
STRAPI_API_URL=http://localhost:1337
STRAPI_READ_TOKEN=<read-only-token-from-step-4>
STRAPI_WRITE_TOKEN=<write-only-token-from-step-4>
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Start Next.js with PM2

```bash
cd /var/www/vhosts/thernbclinic.com/rnb-clinic/frontend
pm2 start npm --name "rnb-nextjs" -- start
pm2 save
```

---

## Step 8 — Plesk Reverse Proxy

### Main site (thernbclinic.com → Next.js :3000)

In Plesk → **thernbclinic.com** → Apache & nginx Settings → **Additional nginx directives**:

```nginx
location / {
    proxy_pass         http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header   Upgrade $http_upgrade;
    proxy_set_header   Connection 'upgrade';
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

### CMS subdomain (cms.thernbclinic.com → Strapi :1337)

Add `cms.thernbclinic.com` as a subdomain in Plesk, then add to its nginx directives:

```nginx
location / {
    proxy_pass         http://127.0.0.1:1337;
    proxy_http_version 1.1;
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
}
```

---

## Step 9 — SSL (Let's Encrypt)

1. In Plesk → **SSL/TLS Certificates** → Let's Encrypt
2. Include `www.thernbclinic.com` alias
3. Enable **Redirect HTTP to HTTPS** in Hosting Settings
4. Issue a separate Let's Encrypt cert for `cms.thernbclinic.com`
5. Verify at [ssllabs.com](https://www.ssllabs.com/ssltest/) — target grade **A**

---

## Step 10 — Post-Deployment Smoke Tests

```bash
# Check both processes are running
pm2 list

# Test endpoints
curl -I https://thernbclinic.com
curl https://thernbclinic.com/sitemap.xml | head -20
curl https://thernbclinic.com/robots.txt

# Verify security headers
curl -I https://thernbclinic.com | grep -E "X-Frame|Content-Security|Strict-Transport|Permissions-Policy"
```

Full checklist: see `docs/PLESK_CHECKLIST.md`

---

## Updating the Site

```bash
cd /var/www/vhosts/thernbclinic.com/rnb-clinic

# Pull latest code
git pull

# Rebuild Strapi if config changed
cd strapi && npm run build && pm2 restart rnb-strapi

# Rebuild Next.js
cd ../frontend && npm run build && pm2 restart rnb-nextjs
```

---

## Environment Variables Reference

### `frontend/.env.local`

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full URL of the site (no trailing slash) |
| `STRAPI_API_URL` | Yes | Internal Strapi URL (e.g. `http://localhost:1337`) |
| `STRAPI_READ_TOKEN` | Yes | Read-only API token from Strapi admin |
| `STRAPI_WRITE_TOKEN` | Yes | Write-only API token for form submissions |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 Measurement ID |

### `strapi/.env`

| Variable | Required | Description |
|---|---|---|
| `APP_KEYS` | Yes | Comma-separated random keys (2+) |
| `API_TOKEN_SALT` | Yes | Random salt for API tokens |
| `ADMIN_JWT_SECRET` | Yes | JWT secret for admin panel |
| `DATABASE_CLIENT` | Yes | `sqlite` (dev) or `mysql2` (prod) |
| `DATABASE_*` | Prod only | MySQL connection details |
| `SMTP_*` | Recommended | Email config for lead notifications |
