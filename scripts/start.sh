#!/usr/bin/env bash
# Nexora — one-shot dev bootstrap.
# Brings up infra (Postgres/Redis/MinIO/Mailhog), prepares the DB, then starts
# api + web + worker in parallel via turbo.
#
# Usage:
#   ./scripts/start.sh              # full bootstrap + dev
#   ./scripts/start.sh --no-seed    # skip db seed (e.g. already seeded)
#   ./scripts/start.sh --fresh      # wipe docker volumes & re-seed
#   ./scripts/start.sh --infra-only # only start docker services
#   ./scripts/start.sh --obs        # also start prometheus+grafana

set -Eeuo pipefail

# ── locate repo root ─────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

# ── colors ───────────────────────────────────────────────────────────────────
if [[ -t 1 ]]; then
  C_RESET=$'\033[0m'; C_DIM=$'\033[2m'; C_BOLD=$'\033[1m'
  C_BLUE=$'\033[34m'; C_GREEN=$'\033[32m'; C_YELLOW=$'\033[33m'; C_RED=$'\033[31m'
else
  C_RESET=""; C_DIM=""; C_BOLD=""; C_BLUE=""; C_GREEN=""; C_YELLOW=""; C_RED=""
fi
log()  { printf "%s▶%s %s\n" "$C_BLUE" "$C_RESET" "$*"; }
ok()   { printf "%s✓%s %s\n" "$C_GREEN" "$C_RESET" "$*"; }
warn() { printf "%s!%s %s\n" "$C_YELLOW" "$C_RESET" "$*"; }
die()  { printf "%s✗%s %s\n" "$C_RED" "$C_RESET" "$*" >&2; exit 1; }

# ── args ─────────────────────────────────────────────────────────────────────
SEED=1
FRESH=0
INFRA_ONLY=0
OBS=0
for arg in "$@"; do
  case "$arg" in
    --no-seed)    SEED=0 ;;
    --fresh)      FRESH=1 ;;
    --infra-only) INFRA_ONLY=1 ;;
    --obs)        OBS=1 ;;
    -h|--help)
      sed -n '2,11p' "$0"; exit 0 ;;
    *) die "Unknown flag: $arg" ;;
  esac
done

# ── prerequisites ────────────────────────────────────────────────────────────
log "Checking prerequisites"
command -v node    >/dev/null || die "node not found. Install Node.js >= 18.18 (recommend 20+ via nvm)."
command -v pnpm    >/dev/null || die "pnpm not found. Install: npm i -g pnpm@9"
command -v docker  >/dev/null || die "docker not found. Install Docker Desktop."
docker info >/dev/null 2>&1   || die "Docker daemon not running. Start Docker Desktop."

if   docker compose version >/dev/null 2>&1; then COMPOSE=(docker compose)
elif command -v docker-compose >/dev/null;   then COMPOSE=(docker-compose)
else die "docker compose plugin not found."
fi

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if   [[ "$NODE_MAJOR" -lt 18 ]]; then die "Node >= 18.18 required (have $(node -v))."
elif [[ "$NODE_MAJOR" -lt 20 ]]; then warn "Node $(node -v) detected — works, but Node 20+ recommended."
fi
ok "Tooling OK (node $(node -v), pnpm $(pnpm -v))"

# ── .env ─────────────────────────────────────────────────────────────────────
if [[ ! -f .env ]]; then
  cp .env.example .env
  ok "Created .env from .env.example (edit secrets before going to prod)"
fi

# Export root .env so prisma/seed/etc. inherit DATABASE_URL etc.
set -a
# shellcheck disable=SC1091
source .env
set +a

# ── infra ────────────────────────────────────────────────────────────────────
if [[ "$FRESH" == "1" ]]; then
  warn "Wiping docker volumes (pgdata, redisdata, miniodata)"
  "${COMPOSE[@]}" down -v
fi

log "Starting infrastructure containers"
COMPOSE_ARGS=(up -d postgres redis minio mailhog)
[[ "$OBS" == "1" ]] && COMPOSE_ARGS=(--profile observability up -d)
"${COMPOSE[@]}" "${COMPOSE_ARGS[@]}"

# ── wait for Postgres ────────────────────────────────────────────────────────
log "Waiting for Postgres to accept connections"
for i in {1..60}; do
  if "${COMPOSE[@]}" exec -T postgres pg_isready -U nexora -d nexora >/dev/null 2>&1; then
    ok "Postgres ready"; break
  fi
  sleep 1
  [[ $i -eq 60 ]] && die "Postgres did not become ready in 60s"
done

# ── wait for Redis ───────────────────────────────────────────────────────────
log "Waiting for Redis"
for i in {1..30}; do
  if "${COMPOSE[@]}" exec -T redis redis-cli ping 2>/dev/null | grep -q PONG; then
    ok "Redis ready"; break
  fi
  sleep 1
  [[ $i -eq 30 ]] && die "Redis did not become ready in 30s"
done

if [[ "$INFRA_ONLY" == "1" ]]; then
  ok "Infrastructure is up. Skipping app boot (--infra-only)."
  exit 0
fi

# ── install deps ─────────────────────────────────────────────────────────────
log "Installing JS dependencies (pnpm)"
pnpm install --frozen-lockfile 2>/dev/null || pnpm install

# ── build workspace packages used by api/web ─────────────────────────────────
log "Building shared package"
pnpm --filter @nexora/shared build

# ── prisma generate + push ───────────────────────────────────────────────────
log "Generating Prisma client"
pnpm --filter @nexora/database db:generate

log "Pushing Prisma schema to database"
pnpm --filter @nexora/database db:push

# ── seed (idempotent — skipped if marker file exists or --no-seed) ───────────
SEED_MARKER=".nexora.seeded"
if [[ "$SEED" == "1" && ! -f "$SEED_MARKER" ]]; then
  log "Seeding database (plans, templates, demo tenant)"
  pnpm --filter @nexora/database db:seed
  date > "$SEED_MARKER"
  ok "Seed complete. Marker: $SEED_MARKER (delete to re-seed, or pass --fresh)"
else
  warn "Skipping seed ($([[ -f $SEED_MARKER ]] && echo "already seeded" || echo "--no-seed"))"
fi

# ── banner ───────────────────────────────────────────────────────────────────
cat <<EOF

${C_BOLD}Nexora is starting${C_RESET}

  ${C_DIM}Marketing${C_RESET}  http://localhost:3000
  ${C_DIM}Dashboard${C_RESET}  http://app.localhost:3000      ${C_DIM}(or http://localhost:3000/dashboard)${C_RESET}
  ${C_DIM}Admin    ${C_RESET}  http://admin.localhost:3000
  ${C_DIM}API      ${C_RESET}  http://localhost:4000
  ${C_DIM}Swagger  ${C_RESET}  http://localhost:4000/docs
  ${C_DIM}MinIO    ${C_RESET}  http://localhost:9003          ${C_DIM}(minioadmin / minioadmin)${C_RESET}
  ${C_DIM}Mailhog  ${C_RESET}  http://localhost:8025
$([[ "$OBS" == "1" ]] && printf "  %sGrafana  %s  http://localhost:3001          %s(admin / admin)%s\n" "$C_DIM" "$C_RESET" "$C_DIM" "$C_RESET")

  ${C_DIM}Seeded credentials${C_RESET}
    Platform admin:  admin@nexora.app  / Admin123!
    Demo tenant:     owner@acme.test   / Owner123!  (tenant slug: acme)

  ${C_DIM}Press Ctrl-C to stop apps. Containers keep running — stop them with:${C_RESET}
    ${COMPOSE[*]} down

EOF

# ── launch apps ──────────────────────────────────────────────────────────────
exec pnpm dev
