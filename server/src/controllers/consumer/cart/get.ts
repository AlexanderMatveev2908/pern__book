import { Response } from "express";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { Cart } from "../../../models/all/Cart.js";
import { CartItem } from "../../../models/all/CartItem.js";
import { Book } from "../../../models/all/Book.js";

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
        include: [
          {
            model: Book,
            as: "book",
            required: true,
          },
        ],
      },
    ],
  });
  if (!cart) return res204(res);

  return res200(res, { msg: "🛒", cart });
};
