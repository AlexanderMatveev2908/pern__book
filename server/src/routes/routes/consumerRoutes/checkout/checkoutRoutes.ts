import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { getCartCheckout } from "../../../../controllers/consumer/checkout/get.js";
import {
  createOrder,
  getAddressCheckout,
} from "../../../../controllers/consumer/checkout/post.js";
import { checkAddressCheckout } from "../../../../middleware/consumer/checkAddressCheckout.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { checkTotPrice } from "../../../../middleware/consumer/checkout/checkTotPrice.js";

const checkoutRouter = express.Router();

checkoutRouter.get("/", wrapApp(getCartCheckout));
checkoutRouter.post("/", checkTotPrice, wrapApp(logJSON), wrapApp(createOrder));
checkoutRouter.post(
  "/address",
  checkAddressCheckout,
  wrapApp(getAddressCheckout)
);

export default checkoutRouter;
