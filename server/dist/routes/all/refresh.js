import express from "express";
import { refreshToken } from "../../controllers/refreshToken.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
const routerRefresh = express.Router();
routerRefresh.post("/", wrapApp(refreshToken));
export default routerRefresh;
