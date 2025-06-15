import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { logJSON } from "../../../../lib/utils/log.js";
import {
  getOrderWorker,
  getWorkerOrders,
} from "../../../../controllers/workerRouter/orders/get.js";
import { validateOrdersQueryWorkers } from "../../../../middleware/workerRouter/orders/validateOrdersQueryWorkers.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";
import { patchOrderWorker } from "../../../../controllers/workerRouter/orders/patch.js";
import { checkPatchOrderBusiness } from "../../../../middleware/sharedValidators/orders/checkPatchOrderBusiness.js";

const ordersRouterWorker = express.Router();

ordersRouterWorker.get(
  "/list/:bookStoreID",
  wrapApp(logJSON),
  validateOrdersQueryWorkers,
  wrapApp(getWorkerOrders)
);

ordersRouterWorker
  .route("/:orderID")
  .all(checkID("orderID"))
  .get(wrapApp(getOrderWorker))
  .patch(checkPatchOrderBusiness, wrapApp(patchOrderWorker));

export default ordersRouterWorker;
