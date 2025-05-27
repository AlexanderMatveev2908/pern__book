import { FaLink } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { v4 } from "uuid";

export const linksCardStore = [
  {
    icon: FaLink,
    label: "Store",
    path: "/owner/book-store/",
  },
  {
    icon: GrUpdate,
    label: "Update",
    path: "/owner/book-store/update/",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
