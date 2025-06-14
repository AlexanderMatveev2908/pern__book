import { Response } from "express";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import {
  OrderStore,
  OrderStoreInstance,
} from "../../../models/all/OrderStore.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { Order } from "../../../models/all/Order.js";
import { OrderItemStore } from "../../../models/all/OrderItemStore.js";
import { Book } from "../../../models/all/Book.js";
import { literal, Op, where } from "sequelize";
import { makeQueryOrdersOwner } from "../../../lib/query/owner/orders.js";
import {
  extractNoHits,
  extractOffset,
  extractSorters,
} from "../../../lib/utils/formatters.js";
import { User } from "../../../models/all/User.js";
import { OrderStage } from "../../../types/all/orders.js";
import { hidePendingOrders } from "../../../lib/query/general/orders.js";
import { err404 } from "../../../lib/responseClient/err.js";

export const getOrdersList = async (req: ReqApp, res: Response) => {
  const { queryAfterPipe, queryStoreOrders, queryBookStore } =
    makeQueryOrdersOwner(req);

  const { rows: orders, count } = await OrderStore.findAndCountAll({
    where: queryStoreOrders,
    include: [
      {
        model: BookStore,
        as: "store",
        where: queryBookStore,
      },
      {
        model: Order,
        as: "order",
        where: hidePendingOrders("o"),
      },
      {
        model: OrderItemStore,
        as: "orderItemStores",
        include: [
          {
            model: Book,
            as: "book",
          },
        ],
        separate: true,
      },
    ],

    group: ["OrderStore.id", "store.id", "order.id"],

    having: queryAfterPipe,

    attributes: {
      include: [
        [
          literal(`(
          SELECT SUM(oi."qty")
          FROM "order_items" AS oi
          WHERE oi."orderStoreID" = "OrderStore".id
          )::INT`),
          "totItems",
        ],
        [
          literal(`(
            SELECT SUM(o."amount" + o."delivery")
            FROM "orders_stores" AS o
            WHERE o."id" = "OrderStore".id
            )::FLOAT`),
          "totAmount",
        ],
      ],
    },

    ...extractSorters(req),
    ...extractOffset(req),
  });

  const { nHits, totPages } = extractNoHits(req, count as any);

  return res200(res, { orders, totPages, nHits });
};

export const getOrderOwner = async (req: ReqApp, res: Response) => {
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
        where: {
          ownerID: userID,
        },
      },
    ],

    attributes: {
      include: [
        [
          literal(`(
            SELECT SUM(oi."qty")
            FROM "order_items" AS oi
            WHERE oi."orderStoreID" = "OrderStore".id
            )`),
          "totItems",
        ],
      ],
    },
  });

  if (!order) return err404(res, { msg: "Order not found" });

  return res200(res, { order });
};
