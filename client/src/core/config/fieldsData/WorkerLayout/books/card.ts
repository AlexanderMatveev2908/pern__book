import { FaLink } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { v4 } from "uuid";

export const linksBookCardWorker = [
  {
    icon: FaLink,
    label: "Book",
    path: "/worker/books/",
  },
  {
    icon: GrUpdate,
    label: "Update",
    path: "/worker/books/update/",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
