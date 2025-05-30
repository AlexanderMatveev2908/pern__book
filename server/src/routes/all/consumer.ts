import express from "express";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { getBooksByBestReviews } from "../../controllers/consumer/get.js";

const consumerRouter = express.Router();

consumerRouter.get("/home", wrapApp(getBooksByBestReviews));

export default consumerRouter;
