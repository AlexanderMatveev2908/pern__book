import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { checkBooksSearchConsumer } from "../../../../middleware/consumer/checkBooksSearch.js";
import {
  getAllBooksConsumer,
  getBooksByBestReviews,
} from "../../../../controllers/consumer/get.js";
import { logJSON } from "../../../../lib/utils/log.js";

const consumerBooksRouter = express.Router();

consumerBooksRouter.get("/home", wrapApp(getBooksByBestReviews));
consumerBooksRouter.get(
  "/",
  wrapApp(logJSON),
  checkBooksSearchConsumer,
  wrapApp(getAllBooksConsumer)
);

export default consumerBooksRouter;
