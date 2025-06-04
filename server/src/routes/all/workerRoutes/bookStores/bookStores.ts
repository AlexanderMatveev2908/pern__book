import express from "express";
import {
  getAllStoresWorker,
  getBookStoreWorker,
} from "../../../../controllers/workerRouter/bookStores/get.js";
import { validateGetStoresWorker } from "../../../../middleware/workerRouter/bookStores/getStores.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { multerDiskStorage } from "../../../../middleware/multer/diskStorage.js";
import { updateStoreManager } from "../../../../controllers/workerRouter/bookStores/put.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";

const bookStoresWorkerRouter = express.Router();

bookStoresWorkerRouter
  .route("/")
  .get(wrapApp(logJSON), validateGetStoresWorker, wrapApp(getAllStoresWorker));

bookStoresWorkerRouter
  .route("/:bookStoreID")
  .all(checkID("bookStoreID"))
  .get(wrapApp(getBookStoreWorker))
  .put(multerDiskStorage, wrapApp(logJSON), wrapApp(updateStoreManager));

export default bookStoresWorkerRouter;
