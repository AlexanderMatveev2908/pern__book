import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import BookStores from "@/pages/OwnerLayout/BookStoreLayout/BookStores/BookStores";
import UpdateBookStore from "@/pages/OwnerLayout/BookStoreLayout/UpdateBookStore/UpdateBookStore";
import CreateBooksStorePage from "@/pages/OwnerLayout/BookStoreLayout/CreateBooksStore/CreateBooksStorePage";
import { Navigate, Outlet } from "react-router-dom";
import BookStorePageOwner from "@/pages/OwnerLayout/BookStoreLayout/BookStorePage/BookStorePageOwner";

export const bookStoreRoutes = {
  path: "book-store",
  element: <Outlet />,
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
    { path: ":bookStoreID", element: <BookStorePageOwner /> },
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
