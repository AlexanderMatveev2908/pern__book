import { FaLink, FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { v4 } from "uuid";

export const actionsBookPage = {
  update: {
    label: "Update",
    icon: GrUpdate,
    path: "/owner/books/update/",
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
    path: "/owner/book-store/book-store/",
    id: v4(),
  },
};

export const linksBookCard = (id: string) =>
  [
    {
      icon: FaLink,
      label: "View more",
      path: `/owner/books/${id}`,
    },
    {
      icon: GrUpdate,
      label: "Update",
      path: `/owner/books/update/${id}`,
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));
