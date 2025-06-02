import express from "express";
import { getCart } from "../../../../controllers/consumer/cart/get.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";

const cartRouter = express.Router();

cartRouter.get("/", wrapApp(getCart));

export default cartRouter;
