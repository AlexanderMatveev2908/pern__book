import { FaLink } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { v4 } from "uuid";

export const linksBookCardWorker = (id: string) =>
  [
    {
      icon: FaLink,
      label: "View more",
      path: `/worker/books/${id}`,
    },
    {
      icon: GrUpdate,
      label: "Update",
      path: `/worker/books/put/${id}`,
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));
