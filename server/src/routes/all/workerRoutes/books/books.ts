import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import {
  getBookListWorker,
  getBookWorker,
  getInfoStore,
} from "../../../../controllers/workerRouter/books/get.js";
import { multerMemoryStorage } from "../../../../middleware/multer/memoryStorage.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { addBookWorker } from "../../../../controllers/workerRouter/books/post.js";
import { validatePostPutBooks } from "../../../../middleware/sharedValidators/postPutBooks.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";
import { updateBookWorker } from "../../../../controllers/workerRouter/books/put.js";
import { deleteBookWorker } from "../../../../controllers/workerRouter/books/delete.js";
import { checkSearchBooksWorker } from "../../../../middleware/workerRouter/books/checkSearchBooksWorker.js";

const workerBooksRouter = express.Router();

workerBooksRouter.get(
  "/list/:bookStoreID",
  checkID("bookStoreID"),
  checkSearchBooksWorker,
  wrapApp(logJSON),
  wrapApp(getBookListWorker)
);

workerBooksRouter.get(
  "/info-store/:bookStoreID",
  checkID("bookStoreID"),
  wrapApp(getInfoStore)
);
workerBooksRouter
  .route("/:bookStoreID")
  .all(checkID("bookStoreID"))
  .post(
    multerMemoryStorage,
    wrapApp(logJSON),
    validatePostPutBooks,
    wrapApp(addBookWorker)
  );
workerBooksRouter
  .route("/:bookID")
  .all(checkID("bookID"))
  .get(wrapApp(getBookWorker))
  .put(
    multerMemoryStorage,
    wrapApp(logJSON),
    validatePostPutBooks,
    wrapApp(updateBookWorker)
  )
  .delete(wrapApp(deleteBookWorker));

export default workerBooksRouter;
