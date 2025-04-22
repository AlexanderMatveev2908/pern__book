import express from "express";
import { getUserProfile } from "../../controllers/profile/get.js";
import { getUserID } from "../../middleware/protected/getUserID.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { uploadSingle } from "../../middleware/multer/single.js";
import { validateProfile } from "../../middleware/user/updateProfile.js";
import { updateProfile } from "../../controllers/profile/patch.js";
import { verifyAccessToken } from "../../middleware/protected/verifyAccessToken.js";

const profileRouter = express.Router();

profileRouter.get("/profile", getUserID, wrapApp(getUserProfile));
profileRouter.patch(
  "/profile",
  verifyAccessToken,
  uploadSingle,
  validateProfile,
  wrapApp(updateProfile)
);

export default profileRouter;
