import { Response } from "express";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { Cart } from "../../../models/all/Cart.js";
import { CartItem } from "../../../models/all/CartItem.js";
import { Book } from "../../../models/all/Book.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { err404 } from "../../../lib/responseClient/err.js";

export const getCart = async (req: ReqApp, res: Response) => {
  const { userID } = req;

  if (!userID) return res204(res);

  const carts = await Cart.findAll({
    where: {
      userID,
    },
    include: [
      {
        model: CartItem,
        as: "items",
        required: true,
        include: [
          {
            model: Book,
            as: "book",
            required: true,
            paranoid: false,
            include: [
              {
                model: BookStore,
                as: "store",
                required: true,
                paranoid: false,
              },
            ],
          },
        ],
      },
    ],

    order: [
      [
        { model: CartItem, as: "items" },
        { model: Book, as: "book" },
        { model: BookStore, as: "store" },
        "name",
        "ASC",
      ],
      [
        { model: CartItem, as: "items" },
        { model: Book, as: "book" },
        "title",
        "ASC",
      ],
    ],
  });
  if (!carts.length) return res204(res);

  return res200(res, { msg: "🛒", cart: carts[0] });
};

export const getFreshQtyItem = async (req: ReqApp, res: Response) => {
  const { cartItemID } = req.params;

  const cartItem = await CartItem.findOne({
    where: {
      id: cartItemID,
    },
    include: [
      {
        model: Book,
        as: "book",
        required: true,
      },
    ],
  });
  if (!cartItem) return err404(res, { msg: "item not found" });

  return res200(res, { qty: cartItem.book!.qty });
};
