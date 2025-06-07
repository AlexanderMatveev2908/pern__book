import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { tErr } from "../../../stuff/quick.js";
import { Cart, CartInstance } from "../../../models/all/Cart.js";
import { CartItem } from "../../../models/all/CartItem.js";
import { seq } from "../../../config/db.js";
import { KEY_ACTION_CART } from "../../../types/all/cart.js";
import {
  err400,
  err404,
  err422,
  err500,
} from "../../../lib/responseClient/err.js";
import { Book } from "../../../models/all/Book.js";
import { Transaction } from "sequelize";
import { User } from "../../../models/all/User.js";

const getCart = async ({ t, userID }: { t: Transaction; userID: string }) => {
  let cart = await Cart.findOne({
    where: {
      userID,
    },
    include: [
      {
        model: CartItem,
        as: "items",
        include: [
          {
            model: Book,
            as: "book",
          },
        ],
      },
    ],
    transaction: t,
  });

  if (!cart) {
    cart = await Cart.create(
      {
        userID,
      },
      { transaction: t }
    );

    cart.items = [];
  }

  return { cart };
};

export const patchCartByClick = async (req: ReqApp, res: Response) => {
  const {
    body: { act },
    userID,
  } = req;
  const { bookID } = req.params;

  let cart: CartInstance | null = null;

  const t = await seq.transaction();

  try {
    ({ cart } = await getCart({
      t,
      userID: userID!,
    }));

    const existingItem = (cart!.items ?? []).find((el) => el.bookID === bookID);
    if (!existingItem) {
      if (act !== KEY_ACTION_CART.INC_QTY_CART) {
        await t.rollback();
        return err404(res, { msg: "item not found" });
      }

      const book = await Book.findByPk(bookID);
      if (!book) {
        await t.rollback();
        return err404(res, { msg: "book not found" });
      }
      if (book.qty < 1) {
        await t.rollback();
        return err422(res, { msg: "not enough books" });
      }

      await CartItem.create(
        {
          cartID: cart!.id,
          bookID,
          qty: 1,
        },
        { transaction: t }
      );
    } else {
      switch (act) {
        case KEY_ACTION_CART.REMOVE_FROM_CART:
          await existingItem.destroy({ transaction: t });
          if (cart!.items!.length < 2) await cart!.destroy({ transaction: t });
          break;

        case KEY_ACTION_CART.INC_QTY_CART:
          if (existingItem.book!.qty < existingItem.qty + 1) {
            await t.rollback();
            return err422(res, { msg: "not enough books" });
          }
          await existingItem.increment("qty", { by: 1, transaction: t });
          break;

        case KEY_ACTION_CART.DEC_QTY_CART:
          if (existingItem.qty - 1 < 0) {
            await t.rollback();
            return err400(res, { msg: "can not set qty less than 0" });
          }
          if (existingItem.qty < 2)
            await existingItem.destroy({ transaction: t });
          else await existingItem.decrement("qty", { by: 1, transaction: t });
          break;

        default:
          break;
      }
    }

    await t.commit();

    return res200(res, { msg: "cart updated" });
  } catch (err) {
    await t.rollback();
    return err500(res);
  }
};

export const updateCartByInputTxt = async (req: ReqApp, res: Response) => {
  const {
    userID,
    body: { qty },
  } = req;
  const { cartItemID } = req.params;

  const cartItem = await CartItem.findOne({
    where: {
      id: cartItemID,
    },
    include: [
      {
        model: Cart,
        as: "cart",
        required: true,
        include: [
          {
            model: User,
            as: "user",
            required: true,
            where: {
              id: userID,
            },
          },
        ],
      },
      {
        model: Book,
        as: "book",
        required: true,
      },
    ],
  });

  if (!cartItem) return err404(res, { msg: "item not found" });
  if (+qty > cartItem.book!.qty)
    return err422(res, { msg: "not enough books" });

  await cartItem.update({ qty });

  return res200(res, { msg: "cart updated" });
};

export const updateCartByMousePress = async (req: ReqApp, res: Response) => {
  const {
    userID,
    body: { qty },
  } = req;
  const { bookID } = req.params;

  const qtyParsed = +qty;

  let cart: CartInstance | null = null;

  const t = await seq.transaction();

  try {
    ({ cart } = await getCart({
      t,
      userID: userID!,
    }));

    const existingItem = (cart!.items ?? []).find((el) => el.bookID === bookID);

    const book = await Book.findByPk(bookID);
    if (!book) {
      await t.rollback();
      return err404(res, { msg: "book not found" });
    }
    if (book.qty < qtyParsed) {
      await t.rollback();
      return err422(res, { msg: "not enough books" });
    }

    if (!existingItem) {
      await CartItem.create(
        {
          bookID,
          cartID: cart!.id,
          qty,
        },
        {
          transaction: t,
        }
      );
    } else {
      if (!qtyParsed) {
        await existingItem.destroy({ transaction: t });
        if (cart!.items!.length < 2) await cart!.destroy({ transaction: t });
      } else {
        await existingItem.update({ qty }, { transaction: t });
      }
    }

    await t.commit();

    return res200(res, { msg: "cart updated" });
  } catch (err) {
    await t.rollback();

    return err500(res);
  }
};
