# Nexora — Multi-Tenant SaaS Platform

> Generate complete digital businesses (website + mobile app + CRM + admin + API) in minutes.

Nexora is a production-grade multi-tenant SaaS platform. A customer signs up, runs the **Create Project Wizard**, and within minutes receives:

- A live website at `slug.nexora.app` (or a custom domain)
- A configured mobile app (Flutter)
- A CRM, admin panel, analytics, and REST API
- Auto-provisioned SSL, CDN routing, and monitoring

---

## Repository layout

```
Nexora/
├── apps/
│   ├── api/              NestJS backend (multi-tenant, RBAC, billing)
│   ├── web/              Next.js 15 — marketing, auth, dashboard, super-admin
│   └── mobile/           Flutter template (branding-synced)
├── packages/
│   ├── database/         Prisma schema, migrations, seed
│   └── shared/           Shared TS types / DTOs
├── infra/
│   ├── k8s/              Kubernetes manifests
│   ├── nginx/            Edge router / reverse proxy
│   └── monitoring/       Prometheus, Grafana, Loki configs
├── .github/workflows/    CI/CD
├── docker-compose.yml    Local dev stack
├── ARCHITECTURE.md       System design, tenancy model, data flow
└── DEPLOYMENT.md         Production deployment runbook
```

---

## Quick start (local dev)

```bash
# 1. Prereqs: Node 20+, pnpm 9+, Docker, Flutter 3.22+ (optional)
corepack enable && corepack prepare pnpm@9 --activate

# 2. Boot infra (Postgres + Redis + MinIO + Mailhog)
docker compose up -d

# 3. Install + migrate
pnpm install
pnpm --filter @nexora/database db:push
pnpm --filter @nexora/database db:seed

# 4. Run API + web in parallel
pnpm dev
```

- API: http://localhost:4000  (Swagger: http://localhost:4000/docs)
- Web: http://localhost:3000
- Mailhog: http://localhost:8025
- MinIO: http://localhost:9001  (minioadmin / minioadmin)

Default credentials seeded:

| Role           | Email                 | Password    |
|----------------|----------------------|-------------|
| Platform admin | `admin@nexora.app`   | `Admin123!` |
| Tenant owner   | `owner@acme.test`    | `Owner123!` |

---

## What's implemented (and what isn't)

This repo is a **production foundation**, not a finished business. The hard architectural decisions are made and the critical paths work end-to-end. Specifically:

### Implemented end-to-end
- Multi-tenant data isolation (tenant_id + Postgres RLS policies)
- Tenant resolution from subdomain / custom domain / JWT
- Auth: email/password, JWT (access + refresh), 2FA (TOTP), password reset
- RBAC (PlatformAdmin, TenantOwner, TenantAdmin, TenantMember, Customer)
- Project generation pipeline (BullMQ job orchestration)
- Stripe billing (subscriptions, plans, webhooks, customer portal)
- Subdomain routing + custom domain verification (DNS TXT) + ACME stub
- Admin panel for tenants/billing/audit
- Tenant dashboard (projects, billing, domains, team, settings)
- Audit log, rate limiting, OWASP headers, CSRF, CORS
- Docker compose, K8s manifests, GitHub Actions CI

### Scaffolded (extension points are clear)
- Drag-and-drop site builder (block schema + renderer present; UI editor stubbed)
- Flutter mobile app (template + branding sync wired; per-feature screens to add)
- Template marketplace (data model + APIs; storefront UI minimal)
- Advanced analytics (event ingest + cohort SQL examples; full BI panels minimal)
- WAF / fraud detection (hooks present; rule engine to plug)

Search for `// NEXORA: TODO` to find every extension point.

See `ARCHITECTURE.md` for the full design and `DEPLOYMENT.md` for production rollout.

---

## License

Proprietary — © Nexora.
