import express from "express";
import bookStoresWorkerRouter from "./subRoutes/bookStores.js";
import workerBooksRouter from "./subRoutes/books.js";

const workerRouter = express.Router();

workerRouter.use("/book-stores", bookStoresWorkerRouter);
workerRouter.use("/books", workerBooksRouter);

export default workerRouter;
