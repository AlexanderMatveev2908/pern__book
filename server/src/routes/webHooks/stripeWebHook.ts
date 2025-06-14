import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { __cg } from "../../lib/utils/log.js";
import { stripe } from "../../config/stripe.js";
import { err409, err500 } from "../../lib/responseClient/err.js";
import { res200 } from "../../lib/responseClient/res.js";
import Stripe from "stripe";
import { seq } from "../../config/db.js";
import { Order } from "../../models/all/Order.js";
import { getPopulatedOrder } from "../../controllers/consumer/checkout/helpers/getters.js";
import { OrderStage } from "../../types/all/orders.js";
import { OrderStore } from "../../models/all/OrderStore.js";
import { OrderItemStore } from "../../models/all/OrderItemStore.js";
import { Book } from "../../models/all/Book.js";
import { tErr } from "../../stuff/quick.js";

const handleRefund = async (id: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);

    const refunds = await stripe.refunds.list({ payment_intent: id });
    const totRefunded = refunds.data.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    if (totRefunded >= paymentIntent.amount) {
      __cg("refund already done");
      return;
    }

    const res = await stripe.refunds.create({
      payment_intent: id,
      reason: "duplicate",
    });

    __cg("refund", res);
  } catch (err) {
    __cg("refund err", err);
  }
};

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

        if (
          !order ||
          order.stage !== OrderStage.PENDING ||
          order!.orderStores!.some((os) => os.store?.isSoftDeleted()) ||
          order.orderStores!.some((os) =>
            os.orderItemStores!.some((ois) => ois.book!.isSoftDeleted())
          )
        ) {
          await handleRefund(paymentIntent.id);
          return err500(res, {
            received: true,
            refunded: true,
          });
        }

        let i = order.orderStores!.length - 1;

        while (i >= 0) {
          const currStore = order.orderStores![i];

          let j = currStore.orderItemStores!.length - 1;

          while (j >= 0) {
            const currItem = currStore.orderItemStores![j];
            const { book } = currItem;

            if (book!.qty < currItem.qty) {
              await t.rollback();
              await handleRefund(paymentIntent.id);
              return res200(res, { received: true, refunded: true });
            }

            await Book.update(
              {
                qty: book!.qty - currItem.qty,
              },
              {
                where: {
                  id: book!.id,
                },
                transaction: t,
              }
            );

            j--;
          }

          i--;
        }

        await Order.update(
          {
            stage: OrderStage.PAID,
            orderedAt: Date.now(),
          },
          {
            where: {
              id: orderID,
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
        await handleRefund(paymentIntent.id);

        __cg("deep deep problem ⚠️⚠️⚠️", err);

        return res200(res, { received: true, refunded: true });
      }

      break;
    }

    default:
      __cg("webhook e", e.type);
  }

  return res200(res, { received: true });
};
