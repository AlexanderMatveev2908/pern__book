import express from "express";
import {
  sendEmailForgotPwd,
  sendEmailVerifyAccount,
} from "../../controllers/sendMail/post.js";
import { limitRoute } from "../../middleware/general/limitRoute.js";
import { validateSendEmail } from "../../middleware/sendMail/validateSendEmail.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";

const sendMailRouter = express.Router();

sendMailRouter.post(
  "/verify-account",
  limitRoute({ max: 3 }),
  validateSendEmail,
  wrapApp(sendEmailVerifyAccount)
);
sendMailRouter.post(
  "/forgot-pwd",
  limitRoute({ max: 3 }),
  validateSendEmail,
  wrapApp(sendEmailForgotPwd)
);

export default sendMailRouter;
