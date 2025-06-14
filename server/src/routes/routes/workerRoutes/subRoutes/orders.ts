import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { logJSON } from "../../../../lib/utils/log.js";
import {
  getOrderWorker,
  getWorkerOrders,
} from "../../../../controllers/workerRouter/orders/get.js";
import { validateOrdersQueryWorkers } from "../../../../middleware/workerRouter/orders/validateOrdersQueryWorkers.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";

const ordersRouterWorker = express.Router();

ordersRouterWorker.get(
  "/list/:bookStoreID",
  wrapApp(logJSON),
  validateOrdersQueryWorkers,
  wrapApp(getWorkerOrders)
);

ordersRouterWorker.get(
  "/:orderID",
  checkID("orderID"),
  wrapApp(getOrderWorker)
);

export default ordersRouterWorker;
