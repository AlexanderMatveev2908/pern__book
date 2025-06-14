import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import {
  getOrderOwner,
  getOrdersList,
} from "../../../../controllers/adminRoutes/orders/get.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { validateQueryOwnerOrders } from "../../../../middleware/adminRoutes/orders/validateQueryOwnerOrders.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";

const ordersRouter = express.Router();

ordersRouter.get(
  "/",
  wrapApp(logJSON),
  validateQueryOwnerOrders,
  wrapApp(getOrdersList)
);

ordersRouter.get("/:orderID", checkID("orderID"), wrapApp(getOrderOwner));

export default ordersRouter;
