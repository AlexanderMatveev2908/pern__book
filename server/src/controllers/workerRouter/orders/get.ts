import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { OrderItemStore } from "../../../models/all/OrderItemStore.js";

export const getWorkerOrders = async (req: ReqApp, res: Response) => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const orders = await OrderStore.findAll({
    where: {
      bookStoreID,
    },
    include: [
      {
        model: BookStore,
        as: "store",
        required: true,
        through: {
          where: {
            userID,
          },
        },
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
