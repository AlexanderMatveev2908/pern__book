import express from "express";
import { loginUser, registerUser } from "../../../controllers/all/auth/post.js";
import { wrapApp } from "../../../middleware/all/general/wrapApp.js";

const router = express.Router();

router.post("/register", wrapApp(registerUser));
router.post("/login", wrapApp(loginUser));

export default router;
