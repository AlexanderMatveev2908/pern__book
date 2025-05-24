import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { v4 } from "uuid";

export const actionsBookPageWorker = {
  update: {
    label: "Update",
    icon: GrUpdate,
    path: "/worker/books/update/",
    id: v4(),
  },
  delete: {
    label: "Delete",
    icon: FaTrashAlt,
    path: "_",
    id: v4(),
  },
};
