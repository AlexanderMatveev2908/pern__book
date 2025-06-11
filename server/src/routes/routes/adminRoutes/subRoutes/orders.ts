import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { getOrdersList } from "../../../../controllers/adminRoutes/orders/get.js";
import { logJSON } from "../../../../lib/utils/log.js";

const ordersRouter = express.Router();

ordersRouter.get("/", wrapApp(logJSON), wrapApp(getOrdersList));

export default ordersRouter;
