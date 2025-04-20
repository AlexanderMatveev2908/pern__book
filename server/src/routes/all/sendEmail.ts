import express from "express";
import {
  limitRoute,
  validateSendEmail,
  wrapApp,
} from "../../middleware/middleware.js";
import {
  sendEmailForgotPwd,
  sendEmailVerifyAccount,
} from "../../controllers/controllers.js";

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
