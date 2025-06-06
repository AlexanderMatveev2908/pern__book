import { Response } from "express";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { Cart } from "../../../models/all/Cart.js";
import { err400, err500 } from "../../../lib/responseClient/err.js";
import { CartItem } from "../../../models/all/CartItem.js";
import { seq } from "../../../config/db.js";
import { Op } from "sequelize";
import { isArrOk } from "../../../lib/dataStructures.js";

export const deleteCart = async (req: ReqApp, res: Response) => {
  const { userID } = req;

  const cart = await Cart.findOne({
    where: {
      userID,
    },
    include: [
      {
        model: CartItem,
        as: "items",
      },
    ],
  });

  if (!cart) return err400(res, "cart not found");

  const t = await seq.transaction();

  try {
    if (isArrOk(cart?.items))
      await CartItem.destroy({
        where: {
          cartID: {
            [Op.in]: cart!.items!.map((el) => el.id),
          },
        },
        transaction: t,
      });

    await cart.destroy({
      transaction: t,
    });

    await t.commit();

    return res200(res, { msg: "cart deleted" });
  } catch (err) {
    await t.rollback();

    return err500(res);
  }
};
