import express from "express";
import { loginUser, registerUser } from "../../controllers/controllers.js";
import {
  limitRoute,
  validateRegister,
  wrapApp,
} from "../../middleware/middleware.js";

const router = express.Router();

router.post(
  "/register",
  limitRoute({ max: 10 }),
  validateRegister,
  wrapApp(registerUser)
);
router.post("/login", wrapApp(loginUser));

export default router;
