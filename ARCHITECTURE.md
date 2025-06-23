# Nexora — Architecture

## 1. High-level topology

```
                 ┌──────────────────────────────────────────────────┐
                 │                Cloudflare / Edge CDN              │
                 │  (DDoS, TLS termination for *.nexora.app, WAF)   │
                 └──────────────────────────┬───────────────────────┘
                                            │
                  ┌─────────────────────────┼─────────────────────────┐
                  │                         │                         │
            ┌─────▼──────┐           ┌──────▼──────┐           ┌──────▼──────┐
            │ NGINX edge │           │  NGINX edge │   ...     │  NGINX edge │
            │ (router)   │           │  (router)   │           │  (router)   │
            └─────┬──────┘           └──────┬──────┘           └──────┬──────┘
                  │                         │                         │
                  └───────────┬─────────────┴─────────────┬───────────┘
                              │                           │
                       ┌──────▼──────┐             ┌──────▼──────┐
                       │  Next.js    │             │   NestJS    │
                       │  web (SSR)  │◄───REST────►│  API (k8s)  │
                       │  k8s        │             │  k8s        │
                       └──────┬──────┘             └──────┬──────┘
                              │                           │
                              │            ┌──────────────┼──────────────┐
                              │            │              │              │
                              │      ┌─────▼────┐   ┌─────▼────┐   ┌────▼─────┐
                              │      │ Postgres │   │  Redis   │   │  S3/MinIO│
                              │      │ (RLS)    │   │ (cache+  │   │ (assets) │
                              │      └──────────┘   │  BullMQ) │   └──────────┘
                              │                     └──────────┘
                              │
                       ┌──────▼─────────┐
                       │  Generated     │
                       │  tenant sites  │
                       │  (served by    │
                       │   Next.js with │
                       │   dynamic      │
                       │   tenant ctx)  │
                       └────────────────┘
```

## 2. Multi-tenancy model

**Choice:** *Shared schema + `tenant_id` + Postgres Row-Level Security (RLS).*

Trade-off considered:
- *Schema-per-tenant* — strongest isolation, but operationally painful past a few hundred tenants (every migration multiplied, connection pool fragmented). Not viable at 100k tenants.
- *Database-per-tenant* — same problem, worse.
- **Shared + RLS** — single migration path, single connection pool, one query plan cache. Isolation enforced by Postgres at row level, not just by app code, so a missing `WHERE` clause cannot leak data.

Implementation:
1. Every business table has a `tenant_id UUID NOT NULL` column with `REFERENCES tenants(id)` and an index on `(tenant_id, ...)`.
2. RLS is enabled on every business table with policies like:
   ```sql
   CREATE POLICY tenant_isolation ON projects
     USING (tenant_id = current_setting('app.current_tenant')::uuid);
   ```
3. The API opens a transaction and runs `SET LOCAL app.current_tenant = '<uuid>'` per request — see `apps/api/src/common/prisma/tenant-prisma.service.ts`.
4. The `PlatformAdmin` role bypasses RLS via a session GUC (`SET LOCAL app.bypass_rls = 'on'`) — only after passing a server-side RBAC check.

Tenant resolution order per HTTP request:
1. `Host` header → look up in `domains` table (custom domains) → tenant.
2. Subdomain of `nexora.app` → `tenants.slug` → tenant.
3. JWT `tid` claim (for tenant-scoped API tokens).
4. None → marketing site / platform-admin context.

## 3. Project generation pipeline

The wizard POSTs to `/v1/projects`. The controller validates the plan limits, creates a `Project` row in `PROVISIONING` state, and enqueues a BullMQ job `project.provision`. The worker runs these steps idempotently with checkpointing in `provision_steps`:

| Step                    | Producer                          | Failure policy            |
|-------------------------|------------------------------------|---------------------------|
| `tenant.ensure`         | Tenant row + RLS context          | Retry 3x exp backoff      |
| `schema.seed`           | Seed business-type starter data   | Retry 3x                  |
| `site.generate`         | Render block tree → static + SSR  | Retry 5x                  |
| `admin.generate`        | Enable admin module flag          | Retry 3x                  |
| `mobile.config`         | Push branding JSON to mobile bkt  | Retry 5x                  |
| `crm.bootstrap`         | Default pipelines, stages         | Retry 3x                  |
| `domain.provision`      | Create subdomain + CNAME entry    | Retry 3x                  |
| `tls.issue`             | ACME http-01 via certmanager      | Retry with rate-limit aware|
| `cdn.publish`           | Invalidate edge cache             | Retry 3x                  |
| `monitoring.activate`   | Register tenant in Prometheus SD  | Retry 3x                  |

End state: `ACTIVE` (or `FAILED` with `failureReason`). Time budget: 2–5 minutes. The dashboard subscribes via WebSocket (`ws://api/v1/projects/:id/events`) to stream progress.

## 4. Authentication & RBAC

- Passwords: `argon2id` (m=64MiB, t=3, p=4).
- Sessions: JWT access (15 min) + refresh (30 d, rotating, family-tracked for theft detection).
- 2FA: TOTP (RFC 6238) + recovery codes (8x10-char, hashed).
- OAuth: Google + GitHub (PKCE, stored in `oauth_identities`).
- Roles: `PLATFORM_ADMIN`, `PLATFORM_SUPPORT`, `TENANT_OWNER`, `TENANT_ADMIN`, `TENANT_MEMBER`, `CUSTOMER`.
- Authorization: `@Roles(...)` decorator + per-resource `CaslAbility` check.

## 5. Billing

Stripe is the system of record for subscriptions; the platform DB mirrors the relevant state via webhooks (`/v1/webhooks/stripe`, idempotent on `event.id`). Plan enforcement happens in `PlanGuard` and `LimitService`:

- Hard limits (projects, domains, storage, seats) — checked at write time.
- Soft limits (API calls, email sends) — counted in Redis with sliding window.

## 6. Custom domains

1. User adds `shop.example.com` → row in `domains` with `status=PENDING_VERIFICATION` and a verification token.
2. We show DNS instructions: `CNAME shop → ingress.nexora.app` + `TXT _nexora-verify.shop = <token>`.
3. Background job polls DNS every 60s for up to 24h; on success → `status=VERIFIED`.
4. Issues TLS via cert-manager (`Certificate` CR with `dnsNames: [shop.example.com]`).
5. NGINX edge picks up the cert from the shared K8s secret store.
6. Background job watches for renewal (cert-manager handles auto-renewal at 30 days remaining).

## 7. Storage

- Hot assets (logos, uploads) → S3-compatible (MinIO in dev, AWS S3 / R2 in prod), served via CDN.
- Per-tenant prefix: `s3://nexora-assets/t/<tenant_id>/...` so we can compute storage usage cheaply and lifecycle-rule on tenant delete.

## 8. Observability

- Metrics: Prometheus scrapes `/metrics` on every pod. Grafana dashboards in `infra/monitoring/grafana-dashboards/`.
- Logs: structured JSON (pino) → stdout → Loki via Promtail/Fluent Bit. Trace + tenant_id on every log line.
- Traces: OpenTelemetry SDK in the API; OTLP → Tempo/Jaeger.
- Errors: Sentry. Tenant ID and user ID set as Sentry tags.
- Audit log: append-only `audit_events` table, never updated, never deleted, partitioned monthly.

## 9. Security posture

- All inbound: TLS 1.3 only, HSTS, OCSP stapling.
- HTTP headers: strict CSP per app, `X-Frame-Options DENY`, `X-Content-Type-Options nosniff`, COOP/COEP, Referrer-Policy.
- CSRF: double-submit cookie on browser endpoints.
- Rate limiting: per-IP + per-tenant + per-route (Redis token bucket).
- Secrets: External Secrets Operator → AWS Secrets Manager / GCP Secret Manager.
- Backups: Postgres WAL-G to S3, 30-day PITR, weekly logical dumps to a separate region.
- Compliance roadmap: SOC2 Type II (controls mapped in `docs/compliance.md`), GDPR (DSR endpoint at `/v1/me/data-export`).

## 10. Scaling plan (to 100k+ tenants)

| Layer        | Bottleneck                | Strategy                                                   |
|--------------|---------------------------|------------------------------------------------------------|
| Edge         | TLS + L7 routing          | Anycast + CDN; NGINX → Envoy when feature needs warrant     |
| API          | CPU on JSON + auth        | Horizontal: HPA on CPU+RPS; stateless pods                  |
| DB writes    | Single-writer PG          | Vertical first (db.r7g.16xlarge), then logical sharding by `tenant_id` hash into N clusters; tenant router caches mapping in Redis |
| DB reads     | Read amplification        | Postgres read replicas + per-tenant query budget            |
| BullMQ       | Worker concurrency        | Per-queue concurrency tuning, separate worker pools per job type |
| Storage      | Object count              | Per-tenant prefixes + S3 lifecycle rules                    |
| Hot tenants  | Noisy neighbours          | Per-tenant rate limits + dedicated pool for Enterprise tier |

Sharding cutover plan documented in `docs/sharding.md` — pre-built tenant router means application code does not change when we split clusters.

## 11. Data model (ERD)

See `packages/database/schema.prisma` — authoritative. High-level entities:

- `tenants` 1—N `users`, `domains`, `projects`, `subscriptions`, `audit_events`
- `projects` 1—N `pages`, `blocks`, `mobile_configs`, `crm_pipelines`, `provision_steps`
- `users` N—N `tenants` via `memberships` (role per tenant)
- `subscriptions` → `plans`, `invoices`, `payment_methods` (mirrored from Stripe)
- `templates` 1—N `template_versions`; M—N projects via `project_templates`
