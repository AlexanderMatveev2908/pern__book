import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { v4 } from "uuid";

export const actionsBookPageWorker = {
  update: {
    label: "Update",
    icon: GrUpdate,
    path: "/worker/books/put/",
    id: v4(),
  },
  delete: {
    label: "Delete",
    icon: FaTrashAlt,
    path: "_",
    id: v4(),
  },
  store: {
    label: "Store",
    icon: HiMiniBuildingLibrary,
    path: "/worker/book-stores/",
    id: v4(),
  },
};
