import express from "express";
import { getAllStoresWorker } from "../../../../controllers/workerRouter/bookStores/get.js";

const bookStoresWorkerRouter = express.Router();

bookStoresWorkerRouter.route("/").get(getAllStoresWorker);

export default bookStoresWorkerRouter;
