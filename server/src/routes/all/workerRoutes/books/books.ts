import express from "express";
import { checkStoreID } from "../../../../middleware/adminStore/checkStoreID.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { getInfoStore } from "../../../../controllers/workerRouter/books/get.js";
import { multerMemoryStorage } from "../../../../middleware/multer/memoryStorage.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { addBookWorker } from "../../../../controllers/workerRouter/books/post.js";
import { validatePostPutBooks } from "../../../../middleware/sharedValidators/postPutBooks.js";

const workerBooksRouter = express.Router();

workerBooksRouter.get(
  "/info-store/:bookStoreID",
  checkStoreID,
  wrapApp(getInfoStore)
);
workerBooksRouter.post(
  "/:bookStoreID",
  checkStoreID,
  multerMemoryStorage,
  wrapApp(logJSON),
  validatePostPutBooks,
  wrapApp(addBookWorker)
);

export default workerBooksRouter;
