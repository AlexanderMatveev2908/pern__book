import express from "express";
import { wrapApp } from "../../middleware/middleware.js";
import { refreshToken } from "../../controllers/controllers.js";
const routerRefresh = express.Router();
routerRefresh.get("/", wrapApp(refreshToken));
export default routerRefresh;
