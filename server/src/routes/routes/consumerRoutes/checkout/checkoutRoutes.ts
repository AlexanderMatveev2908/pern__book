import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import {
  getCartCheckout,
  getClientSecretOrder,
} from "../../../../controllers/consumer/checkout/get.js";
import {
  createOrder,
  getAddressCheckout,
} from "../../../../controllers/consumer/checkout/post.js";
import { checkAddressCheckout } from "../../../../middleware/consumer/checkAddressCheckout.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { checkTotPrice } from "../../../../middleware/consumer/checkout/checkTotPrice.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";

const checkoutRouter = express.Router();

checkoutRouter.get("/", wrapApp(getCartCheckout));
checkoutRouter.post("/", checkTotPrice, wrapApp(logJSON), wrapApp(createOrder));
checkoutRouter.get("/:orderID", wrapApp(getClientSecretOrder));
checkoutRouter.post(
  "/address/:orderID",
  checkID("orderID"),
  checkAddressCheckout,
  wrapApp(getAddressCheckout)
);

export default checkoutRouter;
