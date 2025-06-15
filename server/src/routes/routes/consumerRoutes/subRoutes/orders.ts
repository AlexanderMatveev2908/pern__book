import express from "express";
import { logJSON } from "../../../../lib/utils/log.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import {
  getOrderConsumer,
  getOrdersListConsumer,
} from "../../../../controllers/consumer/orders/get.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";
import { checkQueryOrders } from "../../../../middleware/consumer/checkQueryOrders.js";

const ordersConsumerRouter = express.Router();

ordersConsumerRouter.get(
  "/",
  wrapApp(logJSON),
  checkQueryOrders,
  wrapApp(getOrdersListConsumer)
);
ordersConsumerRouter.get(
  "/:orderID",
  checkID("orderID"),
  wrapApp(getOrderConsumer)
);

export default ordersConsumerRouter;
