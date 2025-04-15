import express from "express";
import { loginUser, registerUser } from "../../controllers/all/auth/post.js";
import { validateRegister, wrapApp } from "../../middleware/middleware.js";
import { limitRoute } from "../../lib/lib.js";
const router = express.Router();
router.post("/register", limitRoute({ max: 10 }), validateRegister, wrapApp(registerUser));
router.post("/login", wrapApp(loginUser));
export default router;
