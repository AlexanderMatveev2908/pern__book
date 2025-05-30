import express from "express";
import {
  getAllStoresWorker,
  getBookStoreWorker,
} from "../../../../controllers/workerRouter/bookStores/get.js";
import { validateGetStoresWorker } from "../../../../middleware/workerRouter/bookStores/getStores.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { checkStoreID } from "../../../../middleware/adminStore/checkStoreID.js";
import { multerDiskStorage } from "../../../../middleware/multer/diskStorage.js";
import { updateStoreManager } from "../../../../controllers/workerRouter/bookStores/put.js";

const bookStoresWorkerRouter = express.Router();

bookStoresWorkerRouter
  .route("/")
  .get(wrapApp(logJSON), validateGetStoresWorker, wrapApp(getAllStoresWorker));

bookStoresWorkerRouter
  .route("/:bookStoreID")
  .get(checkStoreID, wrapApp(getBookStoreWorker))
  .put(
    checkStoreID,
    multerDiskStorage,
    wrapApp(logJSON),
    wrapApp(updateStoreManager)
  );

export default bookStoresWorkerRouter;
