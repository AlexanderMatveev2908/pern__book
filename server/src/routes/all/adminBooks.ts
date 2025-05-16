import express from "express";
import { verifyAccessToken } from "../../middleware/protected/verifyAccessToken.js";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { getInfoBook, getStoreInfo } from "../../controllers/adminBooks/get.js";
import { logJSON } from "../../lib/utils/log.js";
import { createBook } from "../../controllers/adminBooks/post.js";
import { multerMemoryStorage } from "../../middleware/multer/memoryStorage.js";
import { validatePostPutBooks } from "../../middleware/adminBooks/postPut.js";
import { updateBook } from "../../controllers/adminBooks/put.js";

const adminBookRouter = express.Router();

adminBookRouter.get(
  "/stores-info",
  verifyAccessToken({ isVerified: true }),
  wrapApp(getStoreInfo)
);

adminBookRouter
  .route("/")
  .post(
    verifyAccessToken({ isVerified: true }),
    multerMemoryStorage,
    wrapApp(logJSON),
    validatePostPutBooks,
    wrapApp(createBook)
  );

adminBookRouter.get(
  "/info/:bookID",
  verifyAccessToken({ isVerified: true }),
  wrapApp(getInfoBook)
);

adminBookRouter.put(
  "/:bookID",
  verifyAccessToken({ isVerified: true }),
  multerMemoryStorage,
  wrapApp(logJSON),
  validatePostPutBooks,
  wrapApp(updateBook)
);

export default adminBookRouter;
