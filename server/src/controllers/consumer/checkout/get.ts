import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { err404, err422 } from "../../../lib/responseClient/err.js";
import { getCartWithTotPrice } from "./helpers/getCart.js";
import { Order } from "../../../models/all/Order.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { OrderItemStore } from "../../../models/all/OrderItem.js";
import { Book } from "../../../models/all/Book.js";
import { checkAvailabilityStock } from "./helpers/checkAvailability.js";
import { BookStore } from "../../../models/all/BookStore.js";

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

  const order = await Order.findOne({
    where: {
      userID,
      id: orderID,
    },

    include: [
      {
        model: OrderStore,
        as: "orderStores",
        required: true,
        separate: true,
        include: [
          {
            model: BookStore,
            as: "store",
            required: true,
          },
          {
            model: OrderItemStore,
            as: "orderItemStores",
            required: true,
            include: [
              {
                model: Book,
                as: "book",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  });

  if (!order) return err404(res, { msg: "order not found" });

  const { isValid } = checkAvailabilityStock({ order });

  if (!isValid)
    return err422(res, {
      msg: "Entity not processable",
    });

  return res200(res, { order });
};
