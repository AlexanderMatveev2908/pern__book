import express from "express";
import { verifyAccessToken } from "../../middleware/protected/verifyAccessToken.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { getStoreInfo } from "../../controllers/adminBooks/get.js";

const adminBookRouter = express.Router();

adminBookRouter.get(
  "/stores-info",
  verifyAccessToken({ isVerified: true }),
  wrapApp(getStoreInfo)
);

export default adminBookRouter;
