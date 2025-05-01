import express, { RequestHandler } from "express";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { createBookStore } from "../../controllers/adminBookStore/post.js";
import { logJSON } from "../../lib/utils/log.js";
import { multerDiskStorage } from "../../middleware/multer/diskStorage.js";

const adminExpressRouterStore = express.Router();

adminExpressRouterStore
  .route("/")
  .post(multerDiskStorage, wrapApp(logJSON), wrapApp(createBookStore));

export default adminExpressRouterStore;
