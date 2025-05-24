import express from "express";
import { checkStoreID } from "../../../../middleware/adminStore/checkStoreID.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import {
  getBookWorker,
  getInfoStore,
} from "../../../../controllers/workerRouter/books/get.js";
import { multerMemoryStorage } from "../../../../middleware/multer/memoryStorage.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { addBookWorker } from "../../../../controllers/workerRouter/books/post.js";
import { validatePostPutBooks } from "../../../../middleware/sharedValidators/postPutBooks.js";
import { checkBookID } from "../../../../middleware/sharedValidators/ids.js";

const workerBooksRouter = express.Router();

workerBooksRouter.get(
  "/info-store/:bookStoreID",
  checkStoreID,
  wrapApp(getInfoStore)
);
workerBooksRouter
  .route("/:bookStoreID")
  .all(checkStoreID)
  .post(
    multerMemoryStorage,
    wrapApp(logJSON),
    validatePostPutBooks,
    wrapApp(addBookWorker)
  );
workerBooksRouter
  .route("/:bookID")
  .all(checkBookID)
  .get(wrapApp(getBookWorker));

export default workerBooksRouter;
