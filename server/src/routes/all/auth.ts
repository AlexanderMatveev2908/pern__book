import express from "express";
import {
  choseNewPwdForgotOld,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/controllers.js";
import {
  getUserID,
  limitRoute,
  validateChoseNewPwd,
  validateRegister,
  wrapApp,
} from "../../middleware/middleware.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  limitRoute({ max: 10 }),
  validateRegister,
  wrapApp(registerUser)
);
authRouter.post("/login", limitRoute({ max: 10 }), wrapApp(loginUser));
authRouter.post("/logout", getUserID, wrapApp(logoutUser));
authRouter.patch(
  "/recover-account",
  limitRoute({ max: 15 }),
  validateChoseNewPwd,
  wrapApp(choseNewPwdForgotOld)
);

export default authRouter;
