import express from "express";
import consumerBooksRouter from "./books/books.js";
import cartRouter from "./cart/cartRoutes.js";
import { verifyAccessToken } from "../../../middleware/protected/verifyAccessToken.js";
import checkoutRouter from "./checkout/checkoutRoutes.js";

const consumerRouter = express.Router();

consumerRouter.use("/books", consumerBooksRouter);
consumerRouter.use("/cart", verifyAccessToken({}), cartRouter);
consumerBooksRouter.use(
  "/checkout",
  verifyAccessToken({ isVerified: true }),
  checkoutRouter
);

export default consumerRouter;
