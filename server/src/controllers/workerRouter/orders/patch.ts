import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { Order } from "../../../models/all/Order.js";
import { hidePendingOrders } from "../../../lib/query/general/orders.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { User } from "../../../models/all/User.js";
import { err404 } from "../../../lib/responseClient/err.js";

export const patchOrderWorker = async (req: ReqApp, res: Response) => {
  const {
    userID,
    params: { orderID },
    body: { stage },
  } = req;

  const order = await OrderStore.findOne({
    where: {
      id: orderID,
    },
    include: [
      {
        model: Order,
        as: "order",
        required: true,
        where: hidePendingOrders("o"),
      },
      {
        model: BookStore,
        as: "store",
        required: true,
        include: [
          {
            model: User,
            as: "team",
            required: true,
            where: { id: userID },
            through: {
              as: "bookStoreUser",
            },
          },
        ],
      },
    ],
  });

  if (!order) return err404(res, { msg: "Order not found" });

  return res200(res, {});
};
