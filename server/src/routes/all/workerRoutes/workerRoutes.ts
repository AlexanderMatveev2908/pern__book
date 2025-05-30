import express from "express";
import bookStoresWorkerRouter from "./bookStores/bookStores.js";
import workerBooksRouter from "./books/books.js";

const workerRouter = express.Router();

workerRouter.use("/book-stores", bookStoresWorkerRouter);
workerRouter.use("/books", workerBooksRouter);

export default workerRouter;
