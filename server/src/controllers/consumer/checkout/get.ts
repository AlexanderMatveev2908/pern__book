import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { err404, err422 } from "../../../lib/responseClient/err.js";
import { getCartWithTotPrice } from "./helpers/getCart.js";

export const getCartCheckout = async (req: ReqApp, res: Response) => {
  const { userID } = req;

  const { cart } = await getCartWithTotPrice(userID!);

  if (!cart) return err404(res, { msg: "Cart not found" });

  if (!cart.totPrice)
    return err422(res, {
      msg: "Items not present in cart or removed from stock",
    });

  return res200(res, { cart });
};
