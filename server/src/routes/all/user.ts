import express from "express";
import { getUserProfile } from "../../controllers/user/get.js";
import { getUserID } from "../../middleware/protected/getUserID.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { multerThumb } from "../../middleware/multer/thumb.js";
import { validateProfile } from "../../middleware/user/updateProfile.js";
import {
  updateEmail,
  updateProfile,
  updatePwd,
} from "../../controllers/user/patch.js";
import { verifyAccessToken } from "../../middleware/protected/verifyAccessToken.js";
import { allowManageAccount } from "../../controllers/user/post.js";
import { validatePwd } from "../../middleware/user/securityPwd.js";
import { securityLimiter } from "../../middleware/protected/securityLimiter.js";
import {
  clearManageToken,
  deleteAccount,
} from "../../controllers/user/delete.js";
import { limitRoute } from "../../middleware/general/limitRoute.js";
import { checkSecurityToken } from "../../middleware/user/checkSecurityToken.js";
import { validateSendEmail } from "../../middleware/sendMail/validateSendEmail.js";
import { validateNewPwd } from "../../middleware/user/validateNewPwd.js";

const profileRouter = express.Router();

profileRouter
  .route("/profile")
  .get(getUserID, wrapApp(getUserProfile))
  .patch(
    verifyAccessToken({}),
    multerThumb,
    validateProfile,
    wrapApp(updateProfile)
  );
profileRouter
  .route("/security")
  .post(
    securityLimiter,
    verifyAccessToken({}),
    validatePwd,
    wrapApp(allowManageAccount)
  )
  .delete(verifyAccessToken({}), wrapApp(clearManageToken));

profileRouter.patch(
  "/update-email",
  limitRoute({ max: 10 }),
  verifyAccessToken({}),
  checkSecurityToken,
  validateSendEmail,
  wrapApp(updateEmail)
);
profileRouter.patch(
  "/reset-pwd",
  limitRoute({ max: 10 }),
  verifyAccessToken({}),
  checkSecurityToken,
  validateNewPwd,
  wrapApp(updatePwd)
);
profileRouter.delete(
  "/delete-account",
  limitRoute({ max: 10 }),
  verifyAccessToken({}),
  checkSecurityToken,
  wrapApp(deleteAccount)
);
export default profileRouter;
