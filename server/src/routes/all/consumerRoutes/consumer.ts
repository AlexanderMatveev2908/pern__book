import express from "express";
import consumerBooksRouter from "./books/books.js";

const consumerRouter = express.Router();

consumerRouter.use("/books", consumerBooksRouter);

export default consumerRouter;
