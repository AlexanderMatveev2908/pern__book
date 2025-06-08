import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { __cg } from "../../lib/utils/log.js";
import { stripe } from "../../config/stripe.js";
import { err500 } from "../../lib/responseClient/err.js";
import { res200 } from "../../lib/responseClient/res.js";
import Stripe from "stripe";

export const handleStripeWebHook = (req: ReqApp, res: Response) => {
  const sig = req.headers["stripe-signature"];

  let e;

  try {
    e = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEB_HOOK_SECRET!
    );
  } catch (err: any) {
    __cg("webhook err", err?.message);

    return err500(res);
  }

  switch (e.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = e.data.object as Stripe.PaymentIntent;
      console.log(paymentIntent);
      break;
    }

    default:
      __cg("webhook e", e.type);
  }

  return res200(res, { received: true });
};
