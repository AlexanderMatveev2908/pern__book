import express from "express";
import {
  limitRoute,
  validateSendEmail,
  validateVerify,
  wrapApp,
} from "../../middleware/middleware.js";
import {
  verifyAccount,
  verifyEmailForgotPwd,
} from "../../controllers/controllers.js";

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

export default verifyRouter;
