import express from "express";
import { checkStoreID } from "../../../../middleware/adminStore/checkStoreID.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { getInfoStore } from "../../../../controllers/workerRouter/books/get.js";

const workerBooksRouter = express.Router();

workerBooksRouter.get(
  "/info-store/:bookStoreID",
  checkStoreID,
  wrapApp(getInfoStore)
);

export default workerBooksRouter;
