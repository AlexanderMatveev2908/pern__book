import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import BookListWorker from "@/pages/WorkerLayout/BooksLayout/BookListWorker/BookListWorker";
import BookPageWorker from "@/pages/WorkerLayout/BooksLayout/BookPageWorker/BookPageWorker";
import CreateBookWorker from "@/pages/WorkerLayout/BooksLayout/CreateBookWorker/CreateBookWorker";
import UpdateBookWorker from "@/pages/WorkerLayout/BooksLayout/UpdateBookWorker/UpdateBookWorker";
import { Navigate, Outlet } from "react-router-dom";

const booksWorkerRoutes = {
  path: "books",
  element: <Outlet />,
  children: [
    {
      path: "list/:bookStoreID",
      element: (
        <SearchCtxProvider>
          <BookListWorker />
        </SearchCtxProvider>
      ),
    },
    {
      path: ":bookID",
      element: <BookPageWorker />,
    },
    {
      path: "post/:bookStoreID",
      element: <CreateBookWorker />,
    },
    {
      path: "put/:bookID",
      element: <UpdateBookWorker />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
};

export default booksWorkerRoutes;
