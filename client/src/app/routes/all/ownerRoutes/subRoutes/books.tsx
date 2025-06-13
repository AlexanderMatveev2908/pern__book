import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import BooksList from "@/pages/OwnerLayout/BooksLayout/BooksList/BooksList";
import CreateBook from "@/pages/OwnerLayout/BooksLayout/CreateBook/CreateBook";
import UpdateBookPageOwner from "@/pages/OwnerLayout/BooksLayout/UpdateBookPageOwner";
import { Outlet } from "react-router-dom";
import BookPageOwner from "@/pages/OwnerLayout/BooksLayout/BookPageOwner";
import Push from "@/app/routes/helpers/Push";

export const booksRoutes = {
  path: "books",
  element: <Outlet />,
  children: [
    { path: "add-book", element: <CreateBook /> },
    { path: "update/:bookID", element: <UpdateBookPageOwner /> },
    {
      path: "list",
      element: (
        <SearchCtxProvider>
          <BooksList />
        </SearchCtxProvider>
      ),
    },
    { path: ":bookID", element: <BookPageOwner /> },
    { path: "*", element: <Push /> },
  ],
};
