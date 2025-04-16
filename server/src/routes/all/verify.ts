import express from "express";
import { validateVerify, wrapApp } from "../../middleware/middleware.js";
import { verifyAccount } from "../../controllers/controllers.js";

const verifyRouter = express.Router();

verifyRouter.patch("/verify-account", validateVerify, wrapApp(verifyAccount));

export default verifyRouter;
