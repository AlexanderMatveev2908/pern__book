import express from "express";
import {
  sendEmailForgotPwd,
  sendEmailVerifyAccount,
  sendEmailVerifyAccountLogged,
} from "../../controllers/sendMail/post.js";
import { limitRoute } from "../../middleware/general/limitRoute.js";
import { validateSendEmail } from "../../middleware/sendMail/validateSendEmail.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { verifyAccessToken } from "../../middleware/protected/verifyAccessToken.js";

const sendMailRouter = express.Router();

sendMailRouter.post(
  "/verify-account",
  limitRoute({ max: 5 }),
  validateSendEmail,
  wrapApp(sendEmailVerifyAccount)
);
sendMailRouter.post(
  "/verify-account-logged",
  limitRoute({ max: 5 }),
  verifyAccessToken({}),
  validateSendEmail,
  wrapApp(sendEmailVerifyAccountLogged)
);
sendMailRouter.post(
  "/forgot-pwd",
  limitRoute({ max: 5 }),
  validateSendEmail,
  wrapApp(sendEmailForgotPwd)
);

export default sendMailRouter;
