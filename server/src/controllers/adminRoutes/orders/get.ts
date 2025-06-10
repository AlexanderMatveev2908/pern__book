import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { Order } from "../../../models/all/Order.js";
import { OrderItemStore } from "../../../models/all/OrderItem.js";

export const getOrdersList = async (req: ReqApp, res: Response) => {
  const { userID } = req;

  const orders = await OrderStore.findAll({
    where: {},
    include: [
      {
        model: BookStore,
        as: "store",
        required: true,
        where: {
          ownerID: userID,
        },
      },
      {
        model: Order,
        as: "order",
        required: true,
      },
      {
        model: OrderItemStore,
        as: "orderItemStores",
        separate: true,
        required: true,
      },
    ],
  });

  return res200(res, { orders });
};
