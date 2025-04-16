import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { corsMid } from "../middleware/middleware.js";
import authRouter from "./all/auth.js";
import profileRouter from "./all/profile.js";
import verifyRouter from "./all/verify.js";

const routerApp = express.Router();

routerApp.use(express.json());
routerApp.use(express.urlencoded({ extended: true }));
routerApp.use(cookieParser());

routerApp.use(corsMid());

routerApp.use("/auth", authRouter);
routerApp.use("/verify", verifyRouter);
routerApp.use("/profile", profileRouter);

export default routerApp;
