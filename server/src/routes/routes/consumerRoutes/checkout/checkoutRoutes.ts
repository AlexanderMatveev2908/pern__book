import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { getCartCheckout } from "../../../../controllers/consumer/checkout/get.js";

const checkoutRouter = express.Router();

checkoutRouter.get("/", wrapApp(getCartCheckout));

export default checkoutRouter;
