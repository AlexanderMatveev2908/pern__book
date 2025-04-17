import express from "express";
import { verifyAccessToken, wrapApp } from "../../middleware/middleware.js";
import { getStuff } from "../../controllers/controllers.js";

const testRouter = express.Router();

testRouter.get("/", verifyAccessToken({}), wrapApp(getStuff));

export default testRouter;
