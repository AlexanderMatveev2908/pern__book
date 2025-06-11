import { Response } from "express";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { Order } from "../../../models/all/Order.js";
import { OrderItemStore } from "../../../models/all/OrderItemStore.js";
import { calcPagination } from "../../../lib/query/general/pagination.js";
import { sortAndPaginate } from "../../../lib/query/general/sortAndPaginate.js";
import { Book } from "../../../models/all/Book.js";
import { literal } from "sequelize";

export const getOrdersList = async (req: ReqApp, res: Response) => {
  const { userID } = req;

  const orders = await OrderStore.findAll({
    where: {},
    include: [
      {
        model: BookStore,
        as: "store",
        where: {
          ownerID: userID,
        },
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
      ],
    },
  });

  const { paginated, totPages, nHits } = sortAndPaginate(req, orders);

  return res200(res, { orders: paginated, totPages, nHits });
};
