import Push from "@/app/routes/helpers/Push";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import BookListWorker from "@/features/WorkerLayout/BooksLayout/BookListWorker/BookListWorker";
import BookPageWorker from "@/features/WorkerLayout/BooksLayout/BookPageWorker/BookPageWorker";
import CreateBookWorker from "@/features/WorkerLayout/BooksLayout/CreateBookWorker/CreateBookWorker";
import UpdateBookWorker from "@/features/WorkerLayout/BooksLayout/UpdateBookWorker/UpdateBookWorker";
import { Outlet } from "react-router-dom";

export const booksWorkerRoutes = {
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
      element: <Push />,
    },
  ],
};
