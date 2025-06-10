import express from "express";
import adminExpressRouterStore from "./subRoutes/bookstores.js";
import adminBookRouter from "./subRoutes/books.js";
import ordersRouter from "./subRoutes/orders.js";

const adminRouter = express.Router();

adminRouter.use("/bookstores", adminExpressRouterStore);
adminRouter.use("/books", adminBookRouter);
adminRouter.use("/orders", ordersRouter);

export default adminRouter;
