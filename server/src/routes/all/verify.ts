import express from "express";
import {
  verifyAccount,
  verifyNewEmail,
} from "../../controllers/verify/patch.js";
import { verifyEmailForgotPwd } from "../../controllers/verify/post.js";
import { limitRoute } from "../../middleware/general/limitRoute.js";
import { validateVerify } from "../../middleware/verify/verify.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";

const verifyRouter = express.Router();

verifyRouter.patch(
  "/verify-account",
  limitRoute({ max: 5 }),
  validateVerify,
  wrapApp(verifyAccount)
);
verifyRouter.post(
  "/forgot-pwd",
  limitRoute({ max: 5 }),
  validateVerify,
  wrapApp(verifyEmailForgotPwd)
);
verifyRouter.patch(
  "/new-email",
  limitRoute({ max: 5 }),
  validateVerify,
  wrapApp(verifyNewEmail)
);
export default verifyRouter;
