import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import {
  getOrderOwner,
  getOrdersList,
} from "../../../../controllers/adminRoutes/orders/get.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { validateQueryOwnerOrders } from "../../../../middleware/adminRoutes/orders/validateQueryOwnerOrders.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";
import { patchOrderOwner } from "../../../../controllers/adminRoutes/orders/patch.js";
import { checkPatchOrderBusiness } from "../../../../middleware/sharedValidators/orders/checkPatchOrderBusiness.js";

const ordersRouter = express.Router();

ordersRouter.get(
  "/",
  wrapApp(logJSON),
  validateQueryOwnerOrders,
  wrapApp(getOrdersList)
);

ordersRouter
  .route("/:orderID")
  .all(checkID("orderID"))
  .get(wrapApp(getOrderOwner))
  .patch(checkPatchOrderBusiness, wrapApp(patchOrderOwner));

export default ordersRouter;
