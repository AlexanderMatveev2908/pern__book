import express from "express";
import { logJSON } from "../../../../lib/utils/log.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { getOrdersListConsumer } from "../../../../controllers/consumer/orders/get.js";

const ordersConsumerRouter = express.Router();

ordersConsumerRouter.get("/", wrapApp(logJSON), wrapApp(getOrdersListConsumer));

export default ordersConsumerRouter;
