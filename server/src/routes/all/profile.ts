import express from "express";
import { verifyAccessToken, wrapApp } from "../../middleware/middleware.js";
import { getInfoProfileHome } from "../../controllers/controllers.js";

const profileRouter = express.Router();

profileRouter.get(
  "/info-home",
  verifyAccessToken({}),
  wrapApp(getInfoProfileHome)
);

export default profileRouter;
