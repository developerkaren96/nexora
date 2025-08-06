-- Stripe webhook idempotency table (managed outside of Prisma model layer)
CREATE TABLE IF NOT EXISTS _stripe_events (
  id           TEXT PRIMARY KEY,
  received_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
