import express from "express";
import { loginUser, registerUser } from "../../controllers/controllers.js";
import {
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

authRouter.post("/login", wrapApp(loginUser));

export default authRouter;
