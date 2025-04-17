import express from "express";
import { getUserID, wrapApp } from "../../middleware/middleware.js";
import { getUserProfile } from "../../controllers/controllers.js";

const profileRouter = express.Router();

profileRouter.get("/profile", getUserID, wrapApp(getUserProfile));

export default profileRouter;
