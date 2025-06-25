# Deployment

## Environments

| Env      | Purpose                          | Branch       | URL                       |
|----------|----------------------------------|--------------|---------------------------|
| `dev`    | Engineers' shared sandbox        | `develop`    | dev.nexora.app            |
| `stage`  | Pre-prod, mirrors prod data shape| `release/*`  | stage.nexora.app          |
| `prod`   | Customers                        | `main`       | nexora.app / *.nexora.app |

## Cluster

- Kubernetes 1.30+ (EKS in us-east-1 primary, eu-west-1 secondary).
- Node pools:
  - `system` (3x m7g.large, taint=system) — ingress, cert-manager, ESO, monitoring
  - `app` (HPA 3–50, m7g.xlarge) — API + web
  - `workers` (HPA 2–30, m7g.large) — BullMQ workers
- Storage: gp3 EBS for Postgres (or RDS Aurora Postgres in prod), S3 for assets.

## First-time install

```bash
# 1. Cluster prerequisites
helm repo add jetstack https://charts.jetstack.io
helm install cert-manager jetstack/cert-manager -n cert-manager --create-namespace --set installCRDs=true
helm install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace
helm install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx --create-namespace

# 2. Secrets (via External Secrets Operator → AWS SM)
kubectl apply -f infra/k8s/secret-store.yaml
kubectl apply -f infra/k8s/external-secrets.yaml

# 3. Database
kubectl apply -f infra/k8s/postgres.yaml   # or skip if using managed RDS
kubectl exec -it deploy/api -- pnpm db:migrate:deploy

# 4. App
kubectl apply -f infra/k8s/

# 5. Observability
helm install kube-prometheus prometheus-community/kube-prometheus-stack -n observability --create-namespace -f infra/monitoring/values.yaml
helm install loki grafana/loki-stack -n observability -f infra/monitoring/loki-values.yaml
```

## Release pipeline

`.github/workflows/ci.yml` runs on every PR:
1. install + typecheck + lint
2. unit tests (api, web)
3. e2e (Playwright against ephemeral docker compose)
4. build docker images, push to GHCR with `git sha` tag

`.github/workflows/deploy.yml` runs on push to `main`:
1. Reuse images from CI
2. `helm upgrade` with new image tag
3. Run `db migrate deploy` as a K8s Job (blocks rollout if it fails)
4. Wait for `Deployment` readiness, then mark release in Sentry + post to Slack

Rollback: `helm rollback nexora <previous-revision>` — DB migrations are forward-compatible (expand-then-contract pattern).

## Runbook excerpts

### DB connection saturation
1. Check `pg_stat_activity` — kill long idle-in-transaction.
2. Bump `app` HPA max if connection count is healthy per pod (pool size 10).
3. Scale `pgbouncer` deployment.

### Stripe webhook backlog
1. Check `bullmq:stripe-webhooks` queue depth in Grafana.
2. Scale `workers` deployment.
3. Re-deliver via Stripe CLI: `stripe events resend <event_id>`.

### Tenant cert renewal failure
1. `kubectl describe certificate <domain>` — look at `Events`.
2. Common: DNS no longer points to us. Notify tenant via in-app banner.
3. Cert-manager retries automatically; suppress paging if `Reason=DnsChallengeFailed`.
