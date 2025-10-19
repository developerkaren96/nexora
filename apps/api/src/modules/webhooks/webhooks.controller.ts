import { BadRequestException, Controller, Headers, HttpCode, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { ApiTags } from "@nestjs/swagger";
import { BillingService } from "../billing/billing.service";
import { StripeService } from "../billing/stripe.service";
import { Public } from "../../common/auth/public.decorator";

@ApiTags("webhooks")
@Controller("webhooks")
export class WebhooksController {
  constructor(private readonly billing: BillingService, private readonly stripe: StripeService) {}

  @Public() @Post("stripe") @HttpCode(200)
  async stripeHook(@Req() req: Request, @Headers("stripe-signature") signature?: string) {
    if (!signature) throw new BadRequestException("Missing signature");
    const event = this.stripe.constructEvent(req.body as unknown as Buffer, signature);
    await this.billing.handleWebhook(event);
    return { received: true };
  }
}
