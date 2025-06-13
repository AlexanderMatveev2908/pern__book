import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import BookStoresListPage from "@/pages/OwnerLayout/BookStoreLayout/BookStoresListPage";
import UpdateBookStorePage from "@/pages/OwnerLayout/BookStoreLayout/UpdateBookStorePage";
import CreateBooksStorePage from "@/pages/OwnerLayout/BookStoreLayout/CreateBooksStorePage";
import { Outlet } from "react-router-dom";
import BookStorePageOwner from "@/pages/OwnerLayout/BookStoreLayout/BookStorePageOwner";
import Push from "@/app/routes/helpers/Push";

export const bookStoreRoutes = {
  path: "book-store",
  element: <Outlet />,
  children: [
    {
      path: "book-stores",
      element: (
        <SearchCtxProvider>
          <BookStoresListPage />
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
          <UpdateBookStorePage />
        </SwapCtxProvider>
      ),
    },
    { path: "*", element: <Push /> },
  ],
};
