import express from "express";
import bookStoresWorkerRouter from "./bookStores/bookStores.js";

const workerRouter = express.Router();

workerRouter.use("/book-stores", bookStoresWorkerRouter);

export default workerRouter;
