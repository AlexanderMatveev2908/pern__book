import express from "express";
import { loginUser, registerUser } from "../../../controllers/all/auth/post.js";
import { validateRegister, wrapApp } from "../../../middleware/middleware.js";

const router = express.Router();

router.post("/register", validateRegister, wrapApp(registerUser));
router.post("/login", wrapApp(loginUser));

export default router;
