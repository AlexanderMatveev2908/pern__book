import express from "express";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/user.js";
import verifyRouter from "./routes/verify.js";
import routerRefresh from "./routes/refresh.js";
import sendMailRouter from "./routes/sendEmail.js";
import dummyRouter from "./routes/dummy.js";
import { verifyAccessToken } from "../middleware/protected/verifyAccessToken.js";
import workerRouter from "./routes/workerRoutes/workerRoutes.js";
import consumerRouter from "./routes/consumerRoutes/consumer.js";
import adminRouter from "./routes/adminRoutes/adminRoutes.js";

const routerApp = express.Router();

routerApp.use("/auth", authRouter);
routerApp.use("/refresh", routerRefresh);
routerApp.use("/verify", verifyRouter);
routerApp.use("/send-email", sendMailRouter);
routerApp.use("/user", profileRouter);
routerApp.use("/admin", verifyAccessToken({ isVerified: true }), adminRouter);
routerApp.use("/worker", verifyAccessToken({ isVerified: true }), workerRouter);
routerApp.use("/consumer", consumerRouter);
routerApp.use("/dummy", dummyRouter);

export default routerApp;
