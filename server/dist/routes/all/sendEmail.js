import express from "express";
import { limitRoute, validateSendEmail, wrapApp, } from "../../middleware/middleware.js";
import { sendEmailVerifyAccount } from "../../controllers/controllers.js";
const sendMailRouter = express.Router();
sendMailRouter.post("/verify-account", limitRoute({ max: 5 }), validateSendEmail, wrapApp(sendEmailVerifyAccount));
export default sendMailRouter;
