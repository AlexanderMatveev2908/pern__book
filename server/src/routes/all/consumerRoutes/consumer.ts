import express from "express";
import consumerBooksRouter from "./books/books.js";
import cartRouter from "./cart/cartRoutes.js";
import { verifyAccessToken } from "../../../middleware/protected/verifyAccessToken.js";

const consumerRouter = express.Router();

consumerRouter.use("/books", consumerBooksRouter);
consumerRouter.use(
  "/cart",
  verifyAccessToken({ isVerified: true }),
  cartRouter
);
export default consumerRouter;
