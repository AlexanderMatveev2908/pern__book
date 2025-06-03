import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { tErr } from "../../../stuff/quick.js";
import { Cart, CartInstance } from "../../../models/all/Cart.js";
import { CartItem } from "../../../models/all/CartItem.js";
import { seq } from "../../../config/db.js";
import { KEY_ACTION_CART } from "../../../types/all/cart.js";
import { err404, err500 } from "../../../lib/responseClient/err.js";

export const patchCartByClick = async (req: ReqApp, res: Response) => {
  const {
    body: { act },
    userID,
  } = req;
  const { bookID } = req.params;

  let cart: CartInstance | null = null;

  const t = await seq.transaction();

  try {
    cart = await Cart.findOne({
      where: {
        userID,
      },
      include: [
        {
          model: CartItem,
          as: "items",
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

    const existingItem = (cart.items ?? []).find((el) => el.bookID === bookID);
    if (!existingItem) {
      if (act !== KEY_ACTION_CART.INC_QTY_CART) {
        await t.rollback();
        return err404(res, { msg: "item not found" });
      }

      await CartItem.create(
        {
          cartID: cart.id,
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
          await existingItem.increment("qty", { by: 1, transaction: t });
          break;

        case KEY_ACTION_CART.DEC_QTY_CART:
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
