#!/usr/bin/env bash
# =============================================================================
# deploy.sh — RNB Clinic update script (Linux / Plesk)
#
# Run after initial setup is complete (see docs/DEPLOYMENT.md).
# This script pulls latest code, rebuilds both apps, and restarts PM2.
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh            # rebuild both Strapi and Next.js
#   ./deploy.sh strapi     # rebuild Strapi only
#   ./deploy.sh nextjs     # rebuild Next.js only
#
# =============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STRAPI_DIR="$ROOT_DIR/strapi"
FRONTEND_DIR="$ROOT_DIR/frontend"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()  { echo -e "${GREEN}[deploy]${NC} $*"; }
warn()  { echo -e "${YELLOW}[deploy]${NC} $*"; }
error() { echo -e "${RED}[deploy]${NC} $*" >&2; exit 1; }

TARGET="${1:-both}"

# ---------------------------------------------------------------------------
# Pull latest code
# ---------------------------------------------------------------------------
pull_code() {
  info "Pulling latest code..."
  git -C "$ROOT_DIR" pull --ff-only || error "git pull failed — resolve conflicts manually."
  info "Code up to date."
}

# ---------------------------------------------------------------------------
# Rebuild Strapi
# ---------------------------------------------------------------------------
rebuild_strapi() {
  info "Rebuilding Strapi..."
  cd "$STRAPI_DIR"

  if [ ! -f .env ]; then
    error "strapi/.env not found. Copy from .env.example and fill in production values."
  fi

  npm install --production=false
  npm run build
  pm2 restart rnb-strapi 2>/dev/null || pm2 start ecosystem.config.cjs --env production
  pm2 save
  info "Strapi restarted."
}

# ---------------------------------------------------------------------------
# Rebuild Next.js
# ---------------------------------------------------------------------------
rebuild_nextjs() {
  info "Rebuilding Next.js frontend..."
  cd "$FRONTEND_DIR"

  if [ ! -f .env.local ]; then
    error "frontend/.env.local not found. Copy from .env.local.example and fill in tokens."
  fi

  npm install --production=false
  npm run build
  pm2 restart rnb-nextjs 2>/dev/null || pm2 start ecosystem.config.cjs --env production
  pm2 save
  info "Next.js restarted."
}

# ---------------------------------------------------------------------------
# Smoke test
# ---------------------------------------------------------------------------
smoke_test() {
  info "Running quick smoke tests..."
  sleep 3  # give PM2 a moment to start

  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000 2>/dev/null) || true
  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "308" ] || [ "$HTTP_CODE" = "301" ]; then
    info "Next.js health check OK (HTTP $HTTP_CODE)"
  else
    warn "Next.js returned HTTP $HTTP_CODE — check: pm2 logs rnb-nextjs"
  fi

  STRAPI_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:1337/_health 2>/dev/null) || true
  if [ "$STRAPI_CODE" = "204" ] || [ "$STRAPI_CODE" = "200" ]; then
    info "Strapi health check OK (HTTP $STRAPI_CODE)"
  else
    warn "Strapi returned HTTP $STRAPI_CODE — check: pm2 logs rnb-strapi"
  fi
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
pull_code

case "$TARGET" in
  strapi)
    rebuild_strapi
    ;;
  nextjs)
    rebuild_nextjs
    ;;
  both)
    rebuild_strapi
    rebuild_nextjs
    smoke_test
    ;;
  *)
    error "Unknown target '$TARGET'. Use: strapi | nextjs | both"
    ;;
esac

info "Deploy complete. pm2 list:"
pm2 list
