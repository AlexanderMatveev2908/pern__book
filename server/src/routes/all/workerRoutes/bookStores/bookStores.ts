import express from "express";
import { getAllStoresWorker } from "../../../../controllers/workerRouter/bookStores/get.js";
import { validateGetStoresWorker } from "../../../../middleware/workerRouter/bookStores/getStores.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { logJSON } from "../../../../lib/utils/log.js";

const bookStoresWorkerRouter = express.Router();

bookStoresWorkerRouter
  .route("/")
  .get(wrapApp(logJSON), validateGetStoresWorker, wrapApp(getAllStoresWorker));

export default bookStoresWorkerRouter;
