import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import BookStoresLayoutWorker from "@/layouts/WorkerLayout/BookStoresLayoutWorker";
import BookStoreListWorker from "@/pages/WorkerLayout/BookStoreLayout/BookStoreList/BookStoreListWorker";
import BookStorePageWorker from "@/pages/WorkerLayout/BookStoreLayout/BookStorePage/BookStorePageWorker";
import UpdateBookStoreManager from "@/pages/WorkerLayout/BookStoreLayout/UpdateBookStore/UpdateBookStoreManager";
import { Navigate } from "react-router-dom";

const bookStoresWorkerRoutes = {
  path: "book-stores",
  element: <BookStoresLayoutWorker />,
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
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
};

export default bookStoresWorkerRoutes;
