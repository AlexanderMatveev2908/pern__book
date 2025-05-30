import express from "express";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import {
  getAllBooksConsumer,
  getBooksByBestReviews,
} from "../../controllers/consumer/get.js";
import { logJSON } from "../../lib/utils/log.js";
import { checkBooksSearchConsumer } from "../../middleware/consumer/checkBooksSearch.js";

const consumerRouter = express.Router();

consumerRouter.get("/home", wrapApp(getBooksByBestReviews));
consumerRouter.get(
  "/",
  wrapApp(logJSON),
  checkBooksSearchConsumer,
  wrapApp(getAllBooksConsumer)
);

export default consumerRouter;
