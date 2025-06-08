import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { getCartWithTotPrice } from "./helpers/getCart.js";
import { seq } from "../../../config/db.js";
import { __cg } from "../../../lib/utils/log.js";
import { stripe } from "../../../config/stripe.js";
import { err404, err422 } from "../../../lib/responseClient/err.js";
import { Order } from "../../../models/all/Order.js";
import { groupOrdersByStore } from "./helpers/groupOrders.js";

export const getAddressCheckout = async (req: ReqApp, res: Response) => {
  const { userID, body } = req;

  const { cart } = await getCartWithTotPrice(userID!);

  if (!cart) return err404(res, { msg: "Cart not found" });

  if (!cart.totPrice)
    return err422(res, {
      msg: "Items not present in cart or removed from stock",
    });

  const t = await seq.transaction();

  const { groupedOrders } = groupOrdersByStore(cart);

  try {
    // const order = await Order.create(
    //   {
    //     ...body,
    //     userID,
    //   },
    //   {
    //     transaction: t,
    //   }
    // );

    for (const group of Object.values(groupedOrders)) {
      const store = group.store;
      const items = group.items;
    }

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: +(cart.totPrice * 100).toFixed(2),
    //   currency: "usd",
    //   metadata: {
    //     userID: userID!,
    //     orderID: order.id,
    //   },
    // });

    await t.commit();
  } catch (err) {
    await t.rollback();

    __cg("fail pre checkout", err);
  }
  return res200(res, { msg: "ok" });
};
