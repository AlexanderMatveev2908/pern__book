import { FaLink } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { v4 } from "uuid";

export const linksCardStoreWorker = [
  {
    icon: FaLink,
    label: "Store",
    path: "/worker/book-stores/",
  },
  {
    icon: GrUpdate,
    label: "Update",
    path: "/worker/book-stores/update/",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
