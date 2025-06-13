import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { OrderItemStore } from "../../../models/all/OrderItemStore.js";
import { User } from "../../../models/all/User.js";
import { extractNoHits, extractOffset } from "../../../lib/utils/formatters.js";
import { literal } from "sequelize";
import { makeQueryOrdersWorker } from "../../../lib/query/worker/orders.js";
import { Order } from "../../../models/all/Order.js";

export const getWorkerOrders = async (req: ReqApp, res: Response) => {
  const { userID } = req;

  const { queryStoreOrder, queryAfterPipe } = makeQueryOrdersWorker(req);

  const { rows: orders, count } = await OrderStore.findAndCountAll({
    where: queryStoreOrder,
    include: [
      {
        model: Order,
        as: "order",
        required: true,
      },
      {
        model: BookStore,
        as: "store",
        required: true,
        include: [
          {
            model: User,
            as: "team",
            where: { id: userID },
            attributes: ["id"],
            required: true,
            through: {
              as: "bookStoreUser",
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

    group: ["OrderStore.id", "store.id", "order.id"],

    having: queryAfterPipe,

    attributes: {
      include: [
        [
          literal(`(
        SELECT SUM(oi.qty)
        FROM "order_items" AS oi
        WHERE oi."orderStoreID" = "OrderStore"."id"          
          )`),
          "totItems",
        ],
      ],
    },

    ...extractOffset(req),
  });

  const { totPages, nHits } = extractNoHits(req, count);

  return res200(res, { orders, totPages, nHits });
};
