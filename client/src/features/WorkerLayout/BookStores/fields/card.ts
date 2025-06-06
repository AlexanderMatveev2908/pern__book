import { FaLink } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { v4 } from "uuid";

export const linksCardStoreWorker = (id: string) =>
  [
    {
      icon: FaLink,
      label: "View more",
      path: `/worker/book-stores/${id}`,
    },
    {
      icon: GrUpdate,
      label: "Update",
      path: `/worker/book-stores/update/${id}`,
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));
