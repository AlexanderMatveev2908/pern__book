import express from "express";
import { getAllStoresWorker } from "../../../../controllers/workerRouter/bookStores/get.js";
import { validateGetStoresWorker } from "../../../../middleware/workerRouter/bookStores/getStores.js";

const bookStoresWorkerRouter = express.Router();

bookStoresWorkerRouter
  .route("/")
  .get(validateGetStoresWorker, getAllStoresWorker);

export default bookStoresWorkerRouter;
