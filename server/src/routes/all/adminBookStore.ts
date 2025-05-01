import express, { RequestHandler } from "express";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { createBookStore } from "../../controllers/adminBookStore/post.js";
import { logJSON } from "../../lib/utils/log.js";
import { multerDiskStorage } from "../../middleware/multer/diskStorage.js";
import { validateStore } from "../../middleware/adminStore/createStore.js";
import { verifyAccessToken } from "../../middleware/protected/verifyAccessToken.js";

const adminExpressRouterStore = express.Router();

adminExpressRouterStore
  .route("/")
  .post(
    verifyAccessToken({ isVerified: true }),
    multerDiskStorage,
    validateStore,
    wrapApp(logJSON),
    wrapApp(createBookStore)
  );

export default adminExpressRouterStore;
