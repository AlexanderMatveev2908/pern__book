import express from "express";
import { multerDiskStorage } from "../../../../middleware/multer/diskStorage.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { validateStore } from "../../../../middleware/adminStore/store.js";
import { checkTeam } from "../../../../middleware/adminStore/checkTeam.js";
import { createBookStore } from "../../../../controllers/adminBookStore/post.js";
import { validateGetBooksList } from "../../../../middleware/adminBooks/get.js";
import { validateQueryListStores } from "../../../../middleware/adminStore/listStores.js";
import {
  getAllStores,
  getMyStore,
} from "../../../../controllers/adminBookStore/get.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";
import { updateBookStore } from "../../../../controllers/adminBookStore/put.js";
import { deleteStore } from "../../../../controllers/adminBookStore/delete.js";

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
  .all(checkID("bookStoreID"))
  .get(wrapApp(getMyStore))
  .put(
    multerDiskStorage,
    wrapApp(logJSON),
    validateStore,
    checkTeam,
    wrapApp(updateBookStore)
  )
  .delete(wrapApp(deleteStore));

export default adminExpressRouterStore;
