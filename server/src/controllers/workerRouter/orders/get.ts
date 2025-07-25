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
import { hidePendingOrders } from "../../../lib/query/general/orders.js";
import { err404 } from "../../../lib/responseClient/err.js";
import { wrapRawSort } from "../../../lib/query/general/sort.js";

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

    order: [
      ...wrapRawSort(req, "createdAtSort")(`"OrderStore"."createdAt"`),

      ...wrapRawSort(
        req,
        "totAmountSort"
      )(`("OrderStore"."amount" + "OrderStore"."delivery")`),

      ...wrapRawSort(
        req,
        "totItemsSort"
      )(`(
        SELECT SUM(oi.qty)
        FROM "order_items" AS oi
        WHERE oi."orderStoreID" = "OrderStore"."id"
        )`),
    ],

    ...extractOffset(req),
  });

  const { totPages, nHits } = extractNoHits(req, count);

  return res200(res, { orders, totPages, nHits });
};

export const getOrderWorker = async (req: ReqApp, res: Response) => {
  const { userID } = req;
  const { orderID } = req.params;

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
        model: OrderItemStore,
        as: "orderItemStores",
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
            through: {
              as: "bookStoreUser",
            },
          },
        ],
      },
    ],

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
  });

  if (!order) return err404(res, { msg: "Order not found" });

  return res200(res, { order });
};
