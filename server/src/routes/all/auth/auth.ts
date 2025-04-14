import express from "express";
import { registerUser } from "../../../controllers/all/auth/post.js";
import { wrapApp } from "../../../middleware/all/general/wrapApp.js";

const router = express.Router();

router.post("/register", wrapApp(registerUser));

export default router;
