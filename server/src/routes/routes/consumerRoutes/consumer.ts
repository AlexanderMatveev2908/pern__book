import express from "express";
import consumerBooksRouter from "./subRoutes/books.js";
import cartRouter from "./subRoutes/cartRoutes.js";
import { verifyAccessToken } from "../../../middleware/protected/verifyAccessToken.js";
import checkoutRouter from "./subRoutes/checkoutRoutes.js";

const consumerRouter = express.Router();

consumerRouter.use("/books", consumerBooksRouter);
consumerRouter.use("/cart", verifyAccessToken({}), cartRouter);
consumerRouter.use(
  "/checkout",
  verifyAccessToken({ isVerified: true }),
  checkoutRouter
);

export default consumerRouter;
