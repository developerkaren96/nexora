import { Injectable, Logger } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  readonly client: Stripe;
  private readonly log = new Logger(StripeService.name);

  constructor() {
    this.client = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_dummy", {
      apiVersion: "2024-09-30.acacia" as Stripe.LatestApiVersion,
      typescript: true,
    });
  }

  constructEvent(rawBody: Buffer, signature: string): Stripe.Event {
    return this.client.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET ?? "");
  }
}
