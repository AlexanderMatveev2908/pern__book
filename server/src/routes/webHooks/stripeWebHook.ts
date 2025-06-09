import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { __cg } from "../../lib/utils/log.js";
import { stripe } from "../../config/stripe.js";
import { err500 } from "../../lib/responseClient/err.js";
import { res200 } from "../../lib/responseClient/res.js";
import Stripe from "stripe";
import { seq } from "../../config/db.js";
import { Order } from "../../models/all/Order.js";
import { getPopulatedOrder } from "../../controllers/consumer/checkout/helpers/getters.js";
import { OrderStage } from "../../types/all/orders.js";
import { OrderStore } from "../../models/all/OrderStore.js";

export const handleStripeWebHook = async (req: ReqApp, res: Response) => {
  const sig = req.headers["stripe-signature"];

  console.log("run");

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
      const {
        metadata: { orderID, userID },
      } = paymentIntent;

      const t = await seq.transaction();

      try {
        const { order } = await getPopulatedOrder({ orderID, userID });

        if (!order || order.stage !== OrderStage.PENDING)
          return res200(res, { received: true });

        await Order.update(
          {
            stage: OrderStage.PAID,
          },
          {
            where: {
              id: order.id,
            },
            transaction: t,
          }
        );

        await OrderStore.update(
          {
            stage: OrderStage.PAID,
          },
          {
            where: {
              orderID,
            },
            transaction: t,
          }
        );

        await t.commit();
      } catch (err) {
        await t.rollback();

        __cg("deep deep problem ⚠️⚠️⚠️", err);

        // ? not stripe fault, all mine he deserve 200 , i will handle by myself from here on
      }

      break;
    }

    default:
      __cg("webhook e", e.type);
  }

  return res200(res, { received: true });
};
