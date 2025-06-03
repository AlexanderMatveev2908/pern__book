import express from "express";
import { getCart } from "../../../../controllers/consumer/cart/get.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { patchCartByClick } from "../../../../controllers/consumer/cart/patch.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { checkCartCLick } from "../../../../middleware/consumer/checkCartClick.js";
import { getUserID } from "../../../../middleware/protected/getUserID.js";

const cartRouter = express.Router();

cartRouter.get("/", getUserID, wrapApp(getCart));
cartRouter.patch(
  "/click/:bookID",
  wrapApp(logJSON),
  checkCartCLick,
  wrapApp(patchCartByClick)
);

export default cartRouter;
