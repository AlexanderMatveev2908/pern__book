import express from "express";
import { verifyAccessToken, wrapApp } from "../../middleware/middleware.js";
import { getStuff } from "../../controllers/controllers.js";
import { UserRole } from "../../types/types.js";

const testRouter = express.Router();

testRouter.get(
  "/",
  verifyAccessToken({ role: UserRole.CUSTOMER, isVerified: !!0 }),
  wrapApp(getStuff)
);

export default testRouter;
