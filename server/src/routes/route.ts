import express from "express";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/user.js";
import verifyRouter from "./routes/verify.js";
import routerRefresh from "./routes/refresh.js";
import sendMailRouter from "./routes/sendEmail.js";
import adminExpressRouterStore from "./routes/adminBookStore.js";
import dummyRouter from "./routes/dummy.js";
import adminBookRouter from "./routes/adminBooks.js";
import { verifyAccessToken } from "../middleware/protected/verifyAccessToken.js";
import workerRouter from "./routes/workerRoutes/workerRoutes.js";
import consumerRouter from "./routes/consumerRoutes/consumer.js";

const routerApp = express.Router();

routerApp.use("/auth", authRouter);
routerApp.use("/refresh", routerRefresh);
routerApp.use("/verify", verifyRouter);
routerApp.use("/send-email", sendMailRouter);
routerApp.use("/user", profileRouter);
routerApp.use(
  "/admin-book-store",
  verifyAccessToken({ isVerified: true }),
  adminExpressRouterStore
);
routerApp.use(
  "/admin-books",
  verifyAccessToken({ isVerified: true }),
  adminBookRouter
);
routerApp.use("/worker", verifyAccessToken({ isVerified: true }), workerRouter);
routerApp.use("/consumer", consumerRouter);
routerApp.use("/dummy", dummyRouter);

export default routerApp;
