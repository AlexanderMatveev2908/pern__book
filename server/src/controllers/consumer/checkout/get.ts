import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { err404, err422, err500 } from "../../../lib/responseClient/err.js";
import { getCartWithTotPrice, getPopulatedOrder } from "./helpers/getters.js";
import { Order } from "../../../models/all/Order.js";
import { checkAvailabilityStock } from "./helpers/checkAvailability.js";
import { seq } from "../../../config/db.js";
import { deleteOrder } from "./helpers/deleteOrder.js";
import { stripe } from "../../../config/stripe.js";
import { formatFloat } from "../../../lib/utils/formatters.js";
import Stripe from "stripe";
import { __cg } from "../../../lib/utils/log.js";
import { OrderStage } from "../../../types/all/orders.js";

const isSecretOk = (status?: string) =>
  ["requires_payment_method", "requires_confirmation", "requires_action"].some(
    (s) => s === status
  );

export const getCartCheckout = async (req: ReqApp, res: Response) => {
  const { userID } = req;

  const { cart } = await getCartWithTotPrice(userID!);

  if (!cart) return err404(res, { msg: "Cart not found" });

  if (!cart.totPrice)
    return err422(res, {
      msg: "Items not present in cart or removed from stock",
    });

  return res200(res, { cart });
};

export const getClientSecretOrder = async (req: ReqApp, res: Response) => {
  const { userID } = req;
  const { orderID } = req.params;

  const { order } = await getPopulatedOrder({ orderID, userID: userID! });
  if (!order) return err404(res, { msg: "order not found" });

  const { isValid } = checkAvailabilityStock({ order });

  if (!isValid) {
    await deleteOrder(order);
    return err422(res, {
      msg: "Entity not processable",
    });
  }

  const t = await seq.transaction();

  try {
    let paymentIntent: Stripe.PaymentIntent | null = null;

    try {
      paymentIntent = await stripe.paymentIntents.retrieve(order.paymentID);

      __cg("payment intent success", paymentIntent);
    } catch (err) {
      // console.log(err);
    }
    const { status } = paymentIntent ?? {};

    if (!isSecretOk(status)) {
      paymentIntent = await stripe.paymentIntents.create({
        amount: formatFloat(+order.amount * 100),
        currency: "usd",
        metadata: {
          userID: userID!,
          orderID: order.id,
        },
        payment_method_types: ["card"],
      });

      await Order.update(
        {
          paymentID: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
        },
        {
          where: {
            id: order.id,
          },
          transaction: t,
        }
      );
    }

    const updatedOrder = await Order.findByPk(order.id, {
      transaction: t,
    });

    await t.commit();

    return res200(res, { order, clientSecret: updatedOrder!.clientSecret });
  } catch (err) {
    await t.rollback();

    console.log(err);

    return err500(res);
  }
};

export const pollPaidOrder = async (req: ReqApp, res: Response) => {
  const { userID } = req;
  const { orderID } = req.params;

  const order = await Order.findOne({
    where: {
      id: orderID,
      userID,
      stage: OrderStage.PAID,
    },
  });

  if (!order) return err404(res, { msg: "Order not found" });

  return res200(res, { order, msg: "payment successful" });
};
