import OwnerLayout from "@/app/layouts/OwnerLayout/OwnerLayout";
import { bookStoreRoutes } from "./subRoutes/bookStores";
import { booksRoutes } from "./subRoutes/books";
import Push from "../../helpers/Push";

export const ownerRoutes = {
  path: "owner",
  element: <OwnerLayout />,
  children: [
    bookStoreRoutes,
    booksRoutes,
    {
      path: "*",
      element: <Push />,
    },
  ],
};

export default ownerRoutes;
