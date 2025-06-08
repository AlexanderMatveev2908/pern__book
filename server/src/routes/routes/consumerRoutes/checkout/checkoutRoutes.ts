import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { getCartCheckout } from "../../../../controllers/consumer/checkout/get.js";
import { getAddressCheckout } from "../../../../controllers/consumer/checkout/post.js";
import { checkAddressCheckout } from "../../../../middleware/consumer/checkAddressCheckout.js";

const checkoutRouter = express.Router();

checkoutRouter.get("/", wrapApp(getCartCheckout));
checkoutRouter.post(
  "/address",
  checkAddressCheckout,
  wrapApp(getAddressCheckout)
);

export default checkoutRouter;
