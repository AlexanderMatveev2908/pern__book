import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { Order } from "../../../models/all/Order.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { OrderItemStore } from "../../../models/all/OrderItemStore.js";
import { Book } from "../../../models/all/Book.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { extractNoHits, extractOffset } from "../../../lib/utils/formatters.js";
import { literal } from "sequelize";

export const getOrdersListConsumer = async (req: ReqApp, res: Response) => {
  const { userID } = req;

  const { rows: orders, count } = await Order.findAndCountAll({
    where: {
      userID,
    },

    include: [
      {
        model: OrderStore,
        as: "orderStores",
        required: true,
        separate: true,
        include: [
          {
            model: OrderItemStore,
            as: "orderItemStores",
            required: true,
            separate: true,
            include: [
              {
                model: Book,
                as: "book",
              },
            ],
          },
          {
            model: BookStore,
            as: "store",
          },
        ],
      },
    ],

    attributes: {
      include: [
        [
          literal(`(
            SELECT SUM(oi.qty)
            FROM "orders_stores" AS os
            INNER JOIN "order_items" AS oi
            ON os."id" = oi."orderStoreID"
            WHERE os."orderID" = "Order"."id"
            )`),
          "totItems",
        ],
      ],
    },

    ...extractOffset(req),
  });

  const { nHits, totPages } = extractNoHits(req, count);

  return res200(res, {
    orders,
    nHits,
    totPages,
  });
};
