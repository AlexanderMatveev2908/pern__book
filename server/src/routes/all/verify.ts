import express from "express";
import {
  limitRoute,
  validateSendEmail,
  validateVerify,
  wrapApp,
} from "../../middleware/middleware.js";
import {
  sendEmailVerifyAccount,
  verifyAccount,
} from "../../controllers/controllers.js";

const verifyRouter = express.Router();

verifyRouter.patch(
  "/verify-account",
  limitRoute({ max: 5 }),
  validateVerify,
  wrapApp(verifyAccount)
);
verifyRouter.post(
  "/send-email-verify-account",
  limitRoute({ max: 5 }),
  validateSendEmail,
  wrapApp(sendEmailVerifyAccount)
);

export default verifyRouter;
