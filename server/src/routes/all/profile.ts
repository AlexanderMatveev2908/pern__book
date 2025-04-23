import express from "express";
import { getUserProfile } from "../../controllers/profile/get.js";
import { getUserID } from "../../middleware/protected/getUserID.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { uploadSingle } from "../../middleware/multer/single.js";
import { validateProfile } from "../../middleware/user/updateProfile.js";
import { updateProfile } from "../../controllers/profile/patch.js";
import { verifyAccessToken } from "../../middleware/protected/verifyAccessToken.js";
import { allowManageAccount } from "../../controllers/profile/post.js";
import { validatePwd } from "../../middleware/user/security.js";

const profileRouter = express.Router();

profileRouter
  .route("/profile")
  .get(getUserID, wrapApp(getUserProfile))
  .patch(
    verifyAccessToken({}),
    uploadSingle,
    validateProfile,
    wrapApp(updateProfile)
  );
profileRouter.post(
  "/security",
  verifyAccessToken({}),
  validatePwd,
  wrapApp(allowManageAccount)
);

export default profileRouter;
