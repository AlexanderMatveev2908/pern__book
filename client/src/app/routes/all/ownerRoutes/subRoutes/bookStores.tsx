import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import { Outlet } from "react-router-dom";
import BookStoresListOwner from "@/features/OwnerLayout/BookStoresLayout/pages/BookStoresListOwner/BookStoresListOwner";
import CreateBooksStoreOwner from "@/features/OwnerLayout/BookStoresLayout/pages/CreateBooksStoreOwner/CreateBooksStoreOwner";
import UpdateBookStoreOwner from "@/features/OwnerLayout/BookStoresLayout/pages/UpdateBookStoreOwner/UpdateBookStoreOwner";
import BookStorePageOwner from "@/features/OwnerLayout/BookStoresLayout/pages/BookStorePageOwner/BookStorePageOwner";
import { FB_404 } from "@/app/routes/helpers/FB";

export const bookStoreRoutes = {
  path: "book-store",
  element: <Outlet />,
  children: [
    {
      path: "book-stores",
      element: (
        <SearchCtxProvider>
          <BookStoresListOwner />
        </SearchCtxProvider>
      ),
    },
    {
      path: "create",
      element: (
        <SwapCtxProvider>
          <CreateBooksStoreOwner />
        </SwapCtxProvider>
      ),
    },
    { path: ":bookStoreID", element: <BookStorePageOwner /> },
    {
      path: "update/:bookStoreID",
      element: (
        <SwapCtxProvider>
          <UpdateBookStoreOwner />
        </SwapCtxProvider>
      ),
    },
    FB_404(),
  ],
};
