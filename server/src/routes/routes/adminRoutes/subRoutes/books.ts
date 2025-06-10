import express from "express";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";

import { multerMemoryStorage } from "../../../../middleware/multer/memoryStorage.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { validatePostPutBooks } from "../../../../middleware/sharedValidators/postPutBooks.js";
import { validateGetBooksList } from "../../../../middleware/adminBooks/get.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";
import { createBook } from "../../../../controllers/adminRoutes/books/post.js";
import { updateBook } from "../../../../controllers/adminRoutes/books/put.js";
import {
  getBooksList,
  getInfoBook,
  getMyBook,
  getPdf,
  getStoreInfo,
} from "../../../../controllers/adminRoutes/books/get.js";
import { deleteBook } from "../../../../controllers/adminRoutes/books/delete.js";

const adminBookRouter = express.Router();

adminBookRouter.get("/stores-info", wrapApp(getStoreInfo));

adminBookRouter.get("/pdf", wrapApp(getPdf));

adminBookRouter
  .route("/")
  .post(
    multerMemoryStorage,
    wrapApp(logJSON),
    validatePostPutBooks,
    wrapApp(createBook)
  )
  .get(wrapApp(logJSON), validateGetBooksList, wrapApp(getBooksList));

adminBookRouter.get("/info/:bookID", wrapApp(getInfoBook));

adminBookRouter
  .route("/:bookID")
  .all(checkID("bookID"))
  .put(
    multerMemoryStorage,
    wrapApp(logJSON),
    validatePostPutBooks,
    wrapApp(updateBook)
  )
  .delete(wrapApp(logJSON), wrapApp(deleteBook))
  .get(wrapApp(getMyBook));

export default adminBookRouter;
