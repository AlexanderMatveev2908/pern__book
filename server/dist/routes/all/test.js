import express from "express";
import { UserRole } from "../../types/types.js";
import { getStuff } from "../../controllers/test/get.js";
import { verifyAccessToken } from "../../middleware/protected/verifyAccessToken.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
const testRouter = express.Router();
testRouter.get("/", verifyAccessToken({ role: UserRole.CUSTOMER, isVerified: !!0 }), wrapApp(getStuff));
export default testRouter;
