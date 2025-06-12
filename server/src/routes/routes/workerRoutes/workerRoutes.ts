import express from "express";
import bookStoresWorkerRouter from "./subRoutes/bookStores.js";
import workerBooksRouter from "./subRoutes/books.js";
import ordersRouterWorker from "./subRoutes/orders.js";

const workerRouter = express.Router();

workerRouter.use("/book-stores", bookStoresWorkerRouter);
workerRouter.use("/books", workerBooksRouter);
workerRouter.use("/orders", ordersRouterWorker);

export default workerRouter;
