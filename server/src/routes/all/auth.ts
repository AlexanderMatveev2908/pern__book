import express from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/post.js";
import { choseNewPwdForgotOld } from "../../controllers/auth/patch.js";
import { validateRegister } from "../../middleware/auth/validateRegister.js";
import { limitRoute } from "../../middleware/general/limitRoute.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { getUserID } from "../../middleware/protected/getUserID.js";
import { validateChoseNewPwd } from "../../middleware/auth/validateChoseNewPwd.js";

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
  limitRoute({ max: 10 }),
  validateChoseNewPwd,
  wrapApp(choseNewPwdForgotOld)
);

export default authRouter;
