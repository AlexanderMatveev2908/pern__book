import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/controllers.js";
import {
  getUserID,
  limitRoute,
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

export default authRouter;
