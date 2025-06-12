import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { OrderItemStore } from "../../../models/all/OrderItemStore.js";
import { User } from "../../../models/all/User.js";
import { extractNoHits, extractOffset } from "../../../lib/utils/formatters.js";

export const getWorkerOrders = async (req: ReqApp, res: Response) => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const { rows: orders, count } = await OrderStore.findAndCountAll({
    where: {
      bookStoreID,
    },
    include: [
      {
        model: BookStore,
        as: "store",
        required: true,
        include: [
          {
            model: User,
            as: "team",
            where: { id: userID },
            required: true,
            through: {
              where: {
                userID,
              },
            },
          },
        ],
      },
      {
        model: OrderItemStore,
        as: "orderItemStores",
        separate: true,
        required: true,
      },
    ],

    ...extractOffset(req),
  });

  const { totPages, nHits } = extractNoHits(req, count);

  return res200(res, { orders, totPages, nHits });
};
