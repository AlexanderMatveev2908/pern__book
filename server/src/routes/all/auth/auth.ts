import express from "express";
import { registerUser } from "../../../controllers/all/auth/post.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;
