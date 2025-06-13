import express from "express";
import { logJSON } from "../../../../lib/utils/log.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import {
  getOrderConsumer,
  getOrdersListConsumer,
} from "../../../../controllers/consumer/orders/get.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";

const ordersConsumerRouter = express.Router();

ordersConsumerRouter.get("/", wrapApp(logJSON), wrapApp(getOrdersListConsumer));
ordersConsumerRouter.get(
  "/:orderID",
  checkID("orderID"),
  wrapApp(getOrderConsumer)
);

export default ordersConsumerRouter;
