import express from "express";
import { verifyAccessToken, wrapApp } from "../../middleware/middleware.js";
import { getInfoProfileHome } from "../../controllers/controllers.js";
const router = express.Router();
router.get("/info-home", verifyAccessToken({}), wrapApp(getInfoProfileHome));
export default router;
