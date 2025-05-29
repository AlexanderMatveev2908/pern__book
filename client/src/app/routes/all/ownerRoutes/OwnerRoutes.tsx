import OwnerLayout from "@/layouts/OwnerLayout/OwnerLayout";
import { Navigate } from "react-router-dom";
import bookStoreRoutes from "./subRoutes/bookStores";
import booksRoutes from "./subRoutes/books";

const ownerRoutes = {
  path: "owner",
  element: <OwnerLayout />,
  children: [
    bookStoreRoutes,
    booksRoutes,
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
};

export default ownerRoutes;
