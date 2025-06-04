import express from "express";
import {
  getCart,
  getFreshQtyItem,
} from "../../../../controllers/consumer/cart/get.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import {
  patchCartByClick,
  updateCartByInputTxt,
  updateCartByMousePress,
} from "../../../../controllers/consumer/cart/patch.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { checkCartCLick } from "../../../../middleware/consumer/checkCartClick.js";
import { getUserID } from "../../../../middleware/protected/getUserID.js";
import { checkCartItemQty } from "../../../../middleware/consumer/checkCartItemQty.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";

const cartRouter = express.Router();

cartRouter.get("/", getUserID, wrapApp(getCart));
cartRouter.patch(
  "/click/:bookID",
  wrapApp(logJSON),
  checkCartCLick,
  wrapApp(patchCartByClick)
);

cartRouter
  .route("/input/:cartItemID")
  .all(checkID("cartItemID"))
  .get(wrapApp(getFreshQtyItem))
  .patch(checkCartItemQty(1), wrapApp(updateCartByInputTxt));

cartRouter.patch(
  "/press/:bookID",
  checkID("bookID"),
  checkCartItemQty(0),
  wrapApp(updateCartByMousePress)
);

export default cartRouter;
