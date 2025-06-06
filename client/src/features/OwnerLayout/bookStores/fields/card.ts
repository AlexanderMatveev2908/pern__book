import { FaLink } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { v4 } from "uuid";

export const linksCardStore = (id: string) =>
  [
    {
      icon: FaLink,
      label: "View more",
      path: `/owner/book-store/${id}`,
    },
    {
      icon: GrUpdate,
      label: "Update",
      path: `/owner/book-store/update/${id}`,
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));
