import { FaPenFancy } from "react-icons/fa";
import { KEY_MAP_STORE } from "../../../../core/config/fieldsData/labels/shared";
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
    path: "/worker/books/post",
  },
  {
    originalKey: KEY_MAP_STORE.BOOKS,
    label: "Books",
    icon: RiBookShelfFill,
    path: "/worker/books/list",
  },
  {
    originalKey: KEY_MAP_STORE.ORDERS,
    label: "Orders",
    icon: TbTruckDelivery,
    path: "/worker/orders/list",
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
    path: "/worker/book-stores/update",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
