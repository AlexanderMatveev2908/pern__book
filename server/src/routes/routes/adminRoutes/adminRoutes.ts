import express from "express";
import adminExpressRouterStore from "./subRoutes/bookstores.js";
import adminBookRouter from "./subRoutes/books.js";

const adminRouter = express.Router();

adminRouter.use("/bookstores", adminExpressRouterStore);
adminRouter.use("/books", adminBookRouter);

export default adminRouter;
