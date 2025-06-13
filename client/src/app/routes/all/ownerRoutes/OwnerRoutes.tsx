import OwnerLayout from "@/app/layouts/OwnerLayout/OwnerLayout";
import { bookStoreRoutes } from "./subRoutes/bookStores";
import { booksRoutes } from "./subRoutes/books";
import { ordersRoutes } from "./subRoutes/orders";
import { FB_404 } from "../../helpers/FB";

export const ownerRoutes = {
  path: "owner",
  element: <OwnerLayout />,
  children: [bookStoreRoutes, booksRoutes, ordersRoutes, FB_404()],
};

export default ownerRoutes;
