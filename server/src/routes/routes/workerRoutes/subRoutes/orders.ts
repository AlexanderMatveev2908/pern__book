import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { getWorkerOrders } from "../../../../controllers/workerRouter/orders/get.js";
import { validateOrdersQueryWorkers } from "../../../../middleware/workerRouter/orders/validateOrdersQueryWorkers.js";

const ordersRouterWorker = express.Router();

ordersRouterWorker.get(
  "/:bookStoreID",
  wrapApp(logJSON),
  validateOrdersQueryWorkers,
  wrapApp(getWorkerOrders)
);

export default ordersRouterWorker;
