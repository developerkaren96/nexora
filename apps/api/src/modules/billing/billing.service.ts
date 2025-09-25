import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import { StripeService } from "./stripe.service";
import { PlanCode, SubscriptionStatus } from "@nexora/database";
import type Stripe from "stripe";

const PRICE_FOR_PLAN: Record<PlanCode, () => string | undefined> = {
  STARTER:      () => process.env.STRIPE_PRICE_STARTER,
  BUSINESS:     () => process.env.STRIPE_PRICE_BUSINESS,
  PROFESSIONAL: () => process.env.STRIPE_PRICE_PROFESSIONAL,
  ENTERPRISE:   () => process.env.STRIPE_PRICE_ENTERPRISE,
};

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService, private readonly stripe: StripeService) {}

  async createCheckoutSession(tenantId: string, plan: PlanCode, successUrl: string, cancelUrl: string) {
    const tenant = await this.prisma.tenant.findUniqueOrThrow({
      where: { id: tenantId },
      include: { subscription: true, memberships: { where: { role: "TENANT_OWNER" }, include: { user: true }, take: 1 } },
    });
    const owner = tenant.memberships[0]?.user;
    const price = PRICE_FOR_PLAN[plan]?.();
    if (!price) throw new BadRequestException("Plan not configured");

    let customerId = tenant.subscription?.stripeCustomerId;
    if (!customerId) {
      const customer = await this.stripe.client.customers.create({
        email: owner?.email,
        name: tenant.name,
        metadata: { tenantId },
      });
      customerId = customer.id;
    }

    const session = await this.stripe.client.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      subscription_data: { metadata: { tenantId, plan } },
      metadata: { tenantId, plan },
    });
    return { url: session.url };
  }

  async createPortalSession(tenantId: string, returnUrl: string) {
    const sub = await this.prisma.subscription.findUnique({ where: { tenantId } });
    if (!sub?.stripeCustomerId) throw new NotFoundException("No Stripe customer");
    const portal = await this.stripe.client.billingPortal.sessions.create({
      customer: sub.stripeCustomerId, return_url: returnUrl,
    });
    return { url: portal.url };
  }

  /** Webhook entry — idempotent on event.id. */
  async handleWebhook(event: Stripe.Event) {
    // Idempotency lock — write event.id into a dedupe table
    const dedupe = await this.prisma.$executeRawUnsafe(
      `INSERT INTO _stripe_events(id, received_at) VALUES ($1, now()) ON CONFLICT DO NOTHING`,
      event.id,
    ).catch(() => 1);
    if (dedupe === 0) return;

    switch (event.type) {
      case "checkout.session.completed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await this.syncSubscription(event.data.object as Stripe.Subscription | Stripe.Checkout.Session);
        break;
      case "customer.subscription.deleted":
        await this.markCanceled(event.data.object as Stripe.Subscription);
        break;
      case "invoice.paid":
      case "invoice.payment_failed":
        await this.syncInvoice(event.data.object as Stripe.Invoice);
        break;
      default: /* ignore */
    }
  }

  private async syncSubscription(obj: Stripe.Subscription | Stripe.Checkout.Session) {
    let sub: Stripe.Subscription;
    let tenantId: string | undefined;
    if ("object" in obj && obj.object === "checkout.session") {
      const cs = obj as Stripe.Checkout.Session;
      if (!cs.subscription) return;
      sub = await this.stripe.client.subscriptions.retrieve(cs.subscription as string);
      tenantId = (cs.metadata?.tenantId ?? sub.metadata?.tenantId) as string | undefined;
    } else {
      sub = obj as Stripe.Subscription;
      tenantId = sub.metadata?.tenantId as string | undefined;
    }
    if (!tenantId) return;
    const planCode = (sub.metadata?.plan ?? "STARTER") as PlanCode;
    const status = mapStatus(sub.status);

    await this.prisma.subscription.upsert({
      where: { tenantId },
      update: {
        planCode, status,
        stripeCustomerId: sub.customer as string,
        stripeSubscriptionId: sub.id,
        currentPeriodStart: new Date(sub.current_period_start * 1000),
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        cancelAt: sub.cancel_at ? new Date(sub.cancel_at * 1000) : null,
        canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
      },
      create: {
        tenantId, planCode, status,
        stripeCustomerId: sub.customer as string, stripeSubscriptionId: sub.id,
        currentPeriodStart: new Date(sub.current_period_start * 1000),
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
      },
    });
    await this.prisma.tenant.update({ where: { id: tenantId }, data: { status: status === "ACTIVE" ? "ACTIVE" : status === "PAST_DUE" ? "PAST_DUE" : "ACTIVE" } });
  }

  private async markCanceled(sub: Stripe.Subscription) {
    const tenantId = sub.metadata?.tenantId as string | undefined;
    if (!tenantId) return;
    await this.prisma.subscription.update({
      where: { tenantId },
      data: { status: SubscriptionStatus.CANCELED, canceledAt: new Date() },
    });
    await this.prisma.tenant.update({ where: { id: tenantId }, data: { status: "CANCELED" } });
  }

  private async syncInvoice(inv: Stripe.Invoice) {
    const tenantId = (inv.subscription_details?.metadata?.tenantId ?? inv.metadata?.tenantId) as string | undefined;
    if (!tenantId) return;
    await this.prisma.invoice.upsert({
      where: { stripeInvoiceId: inv.id },
      update: {
        amountPaidCents: inv.amount_paid, status: inv.status ?? "open",
        hostedUrl: inv.hosted_invoice_url ?? undefined, pdfUrl: inv.invoice_pdf ?? undefined,
      },
      create: {
        tenantId, stripeInvoiceId: inv.id, number: inv.number ?? undefined,
        amountDueCents: inv.amount_due, amountPaidCents: inv.amount_paid,
        currency: inv.currency, status: inv.status ?? "open",
        hostedUrl: inv.hosted_invoice_url ?? undefined, pdfUrl: inv.invoice_pdf ?? undefined,
        periodStart: inv.period_start ? new Date(inv.period_start * 1000) : undefined,
        periodEnd: inv.period_end ? new Date(inv.period_end * 1000) : undefined,
      },
    });
  }
}

function mapStatus(s: Stripe.Subscription.Status): SubscriptionStatus {
  switch (s) {
    case "active": return "ACTIVE";
    case "trialing": return "TRIALING";
    case "past_due": return "PAST_DUE";
    case "canceled": return "CANCELED";
    case "unpaid": return "UNPAID";
    case "incomplete":
    case "incomplete_expired":
    default: return "INCOMPLETE";
  }
}
