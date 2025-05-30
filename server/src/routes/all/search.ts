import express from "express";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { getBooksByBestReviews } from "../../controllers/search/get.js";

const searchRouter = express.Router();

searchRouter.get("/best-avg-rating", wrapApp(getBooksByBestReviews));

export default searchRouter;
