import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { corsMid } from "../middleware/middleware.js";
import authRouter from "./all/auth/auth.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.use(corsMid());

router.use("/auth", authRouter);

export default router;
