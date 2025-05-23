import { FaPenFancy } from "react-icons/fa";
import { KEY_MAP_STORE } from "../../general/labels";
import { RiBookShelfFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { MdReviews } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { v4 } from "uuid";

export const actionsBookStoreWorker = [
  {
    originalKey: KEY_MAP_STORE.ADD_BOOK,
    label: "Add Book",
    icon: FaPenFancy,
    path: "/owner/books/add-book",
  },
  {
    originalKey: KEY_MAP_STORE.BOOKS,
    label: "Books",
    icon: RiBookShelfFill,
    path: "/",
  },
  {
    originalKey: KEY_MAP_STORE.ORDERS,
    label: "Orders",
    icon: TbTruckDelivery,
    path: "/",
  },
  {
    originalKey: KEY_MAP_STORE.REVIEWS,
    label: "Reviews",
    icon: MdReviews,
    path: "/",
  },
  {
    originalKey: KEY_MAP_STORE.UPDATE,
    label: "Update",
    icon: GrUpdate,
    path: "/owner/book-store/update/",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
