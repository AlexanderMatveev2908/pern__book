import express from "express";
import { getUserProfile } from "../../controllers/profile/get.js";
import { getUserID } from "../../middleware/protected/getUserID.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
const profileRouter = express.Router();
profileRouter.get("/profile", getUserID, wrapApp(getUserProfile));
export default profileRouter;
