import { FB_404 } from "@/app/routes/helpers/FB";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import BookStoreListWorker from "@/features/WorkerLayout/BookStoresLayout/pages/BookStoreListWorker/BookStoreListWorker";
import BookStorePageWorker from "@/features/WorkerLayout/BookStoresLayout/pages/BookStorePageWorker/BookStorePageWorker";
import UpdateBookStoreManager from "@/features/WorkerLayout/BookStoresLayout/pages/UpdateBookStoreWorker/UpdateBookStoreManager";
import { Outlet } from "react-router-dom";

export const bookStoresWorkerRoutes = {
  path: "book-stores",
  element: <Outlet />,
  children: [
    {
      path: "list",
      element: (
        <SearchCtxProvider>
          <BookStoreListWorker />
        </SearchCtxProvider>
      ),
    },
    {
      path: "update/:bookStoreID",
      element: (
        <SwapCtxProvider>
          <UpdateBookStoreManager />
        </SwapCtxProvider>
      ),
    },
    {
      path: ":bookStoreID",
      element: <BookStorePageWorker />,
    },
    FB_404(),
  ],
};
