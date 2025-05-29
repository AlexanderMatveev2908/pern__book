import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import BookStoreLayout from "@/layouts/OwnerLayout/BookStoreLayout";
import BookStorePage from "@/pages/OwnerLayout/BookStoreLayout/BookStorePage/BookStorePage";
import BookStores from "@/pages/OwnerLayout/BookStoreLayout/BookStores/BookStores";
import UpdateBookStore from "@/pages/OwnerLayout/BookStoreLayout/UpdateBookStore/UpdateBookStore";
import CreateBooksStorePage from "@/pages/OwnerLayout/BookStoreLayout/CreateBooksStore/CreateBooksStorePage";
import { Navigate } from "react-router-dom";

const bookStoreRoutes = {
  path: "book-store",
  element: <BookStoreLayout />,
  children: [
    {
      path: "book-stores",
      element: (
        <SearchCtxProvider>
          <BookStores />
        </SearchCtxProvider>
      ),
    },
    {
      path: "create",
      element: (
        <SwapCtxProvider>
          <CreateBooksStorePage />
        </SwapCtxProvider>
      ),
    },
    { path: ":bookStoreID", element: <BookStorePage /> },
    {
      path: "update/:bookStoreID",
      element: (
        <SwapCtxProvider>
          <UpdateBookStore />
        </SwapCtxProvider>
      ),
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ],
};

export default bookStoreRoutes;
