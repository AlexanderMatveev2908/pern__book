import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { __cr, corsMid } from "../middleware/middleware.js";
import authRouter from "./all/auth.js";
import profileRouter from "./all/profile.js";
import verifyRouter from "./all/verify.js";
import routerRefresh from "./all/refresh.js";
import testRouter from "./all/test.js";
import sendMailRouter from "./all/sendEmail.js";

const routerApp = express.Router();

routerApp.use(express.json());
routerApp.use(express.urlencoded({ extended: true }));
routerApp.use(cookieParser());

routerApp.use(corsMid());

routerApp.use(__cr);

routerApp.use("/auth", authRouter);
routerApp.use("/refresh", routerRefresh);
routerApp.use("/verify", verifyRouter);
routerApp.use("/send-email", sendMailRouter);
routerApp.use("/user", profileRouter);
routerApp.use("/protected", testRouter);
export default routerApp;
