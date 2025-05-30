import express from "express";
import { wrapApp } from "../../middleware/general/wrapApp.js";
import { createBookStore } from "../../controllers/adminBookStore/post.js";
import { logJSON } from "../../lib/utils/log.js";
import { multerDiskStorage } from "../../middleware/multer/diskStorage.js";
import { validateStore } from "../../middleware/adminStore/store.js";
import {
  getAllStores,
  getMyStore,
} from "../../controllers/adminBookStore/get.js";
import { updateBookStore } from "../../controllers/adminBookStore/put.js";
import { checkTeam } from "../../middleware/adminStore/checkTeam.js";
import { deleteStore } from "../../controllers/adminBookStore/delete.js";
import { validateQueryListStores } from "../../middleware/adminStore/listStores.js";
import { checkStoreID } from "../../middleware/adminStore/checkStoreID.js";
import { validateGetBooksList } from "../../middleware/adminBooks/get.js";

const adminExpressRouterStore = express.Router();

adminExpressRouterStore
  .route("/")
  .post(
    multerDiskStorage,
    wrapApp(logJSON),
    validateStore,
    checkTeam,
    wrapApp(createBookStore)
  )
  .get(
    wrapApp(logJSON),
    validateGetBooksList,
    validateQueryListStores,
    wrapApp(getAllStores)
  );

adminExpressRouterStore
  .route("/:bookStoreID")
  .get(checkStoreID, wrapApp(getMyStore))
  .put(
    checkStoreID,
    multerDiskStorage,
    wrapApp(logJSON),
    validateStore,
    checkTeam,
    wrapApp(updateBookStore)
  )
  .delete(checkStoreID, wrapApp(deleteStore));

export default adminExpressRouterStore;
