import { Response } from "express";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { Cart } from "../../../models/all/Cart.js";
import { CartItem } from "../../../models/all/CartItem.js";
import { Book } from "../../../models/all/Book.js";
import { BookStore } from "../../../models/all/BookStore.js";

export const getCart = async (req: ReqApp, res: Response) => {
  const { userID } = req;

  if (!userID) return res204(res);

  const cart = await Cart.findOne({
    where: {
      userID,
    },
    include: [
      {
        model: CartItem,
        as: "items",
        required: true,
        separate: true,
        include: [
          {
            model: Book,
            as: "book",
            required: true,
            include: [
              {
                model: BookStore,
                as: "store",
                required: true,
                attributes: [
                  "id",
                  "name",
                  "deliveryPrice",
                  "freeDeliveryAmount",
                  "deliveryTime",
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  if (!cart) return res204(res);

  return res200(res, { msg: "🛒", cart });
};
