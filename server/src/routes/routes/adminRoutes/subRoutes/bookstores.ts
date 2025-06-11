import express from "express";
import { multerDiskStorage } from "../../../../middleware/multer/diskStorage.js";
import { logJSON } from "../../../../lib/utils/log.js";
import { wrapApp } from "../../../../middleware/general/wrapApp.js";
import { validateStore } from "../../../../middleware/adminRoutes/adminStore/store.js";
import { checkTeam } from "../../../../middleware/adminRoutes/adminStore/checkTeam.js";
import { validateQueryListStores } from "../../../../middleware/adminRoutes/adminStore/listStores.js";
import { createBookStore } from "../../../../controllers/adminRoutes/bookstores/post.js";
import {
  getAllStores,
  getMyStore,
} from "../../../../controllers/adminRoutes/bookstores/get.js";
import { checkID } from "../../../../middleware/sharedValidators/ids.js";
import { updateBookStore } from "../../../../controllers/adminRoutes/bookstores/put.js";
import { deleteStore } from "../../../../controllers/adminRoutes/bookstores/delete.js";

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
  .get(wrapApp(logJSON), validateQueryListStores, wrapApp(getAllStores));

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
