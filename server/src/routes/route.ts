import express from "express";
import authRouter from "./all/auth.js";
import profileRouter from "./all/user.js";
import verifyRouter from "./all/verify.js";
import routerRefresh from "./all/refresh.js";
import sendMailRouter from "./all/sendEmail.js";
import { __cr } from "../middleware/general/logger.js";

const routerApp = express.Router();

// routerApp.use(__cr);

routerApp.use("/auth", authRouter);
routerApp.use("/refresh", routerRefresh);
routerApp.use("/verify", verifyRouter);
routerApp.use("/send-email", sendMailRouter);
routerApp.use("/user", profileRouter);

export default routerApp;
