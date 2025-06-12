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
import { calcPagination } from "../../../lib/query/general/pagination.js";
import { sortAndPaginate } from "../../../lib/query/general/sortAndPaginate.js";
import { Book } from "../../../models/all/Book.js";
import { literal, Op, where } from "sequelize";
import { makeQueryOrdersOwner } from "../../../lib/query/owner/orders/query.js";
import {
  extractNoHits,
  extractOffset,
  extractSorters,
} from "../../../lib/utils/formatters.js";

export const getOrdersList = async (req: ReqApp, res: Response) => {
  const { queryAfterPipe, queryStoreOrders, queryBookStore } =
    makeQueryOrdersOwner(req);

  const { rows: orders, count: nHits } = await OrderStore.findAndCountAll({
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

    order: [...(extractSorters(req) as [string, string][])],

    ...extractOffset(req),
  });

  const totPages = extractNoHits(req, nHits);

  return res200(res, { orders, totPages, nHits: nHits.length });
};
