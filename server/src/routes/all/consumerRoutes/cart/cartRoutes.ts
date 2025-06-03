import express from "express";
import { getCart } from "../../../../controllers/consumer/cart/get.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { patchCartByClick } from "../../../../controllers/consumer/cart/patch.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { checkCartCLick } from "../../../../middleware/consumer/checkCartClick.js";
import { verifyAccessToken } from "../../../../middleware/protected/verifyAccessToken.js";

const cartRouter = express.Router();

cartRouter.get("/", wrapApp(getCart));
cartRouter.patch(
  "/click/:bookID",
  verifyAccessToken({ isVerified: true }),
  checkCartCLick,
  wrapApp(logJSON),
  wrapApp(patchCartByClick)
);

export default cartRouter;
