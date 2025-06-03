import express from "express";
import { getCart } from "../../../../controllers/consumer/cart/get.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { patchCartByClick } from "../../../../controllers/consumer/cart/patch.js";
import { logJSON } from "../../../../lib/utils/log.js";

const cartRouter = express.Router();

cartRouter.get("/", wrapApp(getCart));
cartRouter.patch("/click/:bookID", wrapApp(logJSON), wrapApp(patchCartByClick));

export default cartRouter;
