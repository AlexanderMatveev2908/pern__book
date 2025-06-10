import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { getOrdersList } from "../../../../controllers/adminRoutes/orders/get.js";

const ordersRouter = express.Router();

ordersRouter.get("/", wrapApp(getOrdersList));

export default ordersRouter;
