import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { checkBooksSearchConsumer } from "../../../../middleware/consumer/checkBooksSearch.js";
import {
  getAllBooksConsumer,
  getBooksByBestReviews,
  getSingleBookConsumer,
} from "../../../../controllers/consumer/books/get.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";

const consumerBooksRouter = express.Router();

consumerBooksRouter.get("/home", wrapApp(getBooksByBestReviews));
consumerBooksRouter.get(
  "/",
  wrapApp(logJSON),
  checkBooksSearchConsumer,
  wrapApp(getAllBooksConsumer)
);
consumerBooksRouter.get(
  "/:bookID",
  checkID("bookID"),
  wrapApp(getSingleBookConsumer)
);

export default consumerBooksRouter;
