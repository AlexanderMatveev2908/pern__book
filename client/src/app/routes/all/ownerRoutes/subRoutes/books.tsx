import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import BooksList from "@/pages/OwnerLayout/BooksLayout/BooksListOwnerPage";
import CreateBookOwnerPage from "@/pages/OwnerLayout/BooksLayout/CreateBookOwnerPage";
import UpdateBookPageOwner from "@/pages/OwnerLayout/BooksLayout/UpdateBookPageOwner";
import { Outlet } from "react-router-dom";
import BookPageOwner from "@/pages/OwnerLayout/BooksLayout/BookPageOwner";
import Push from "@/app/routes/helpers/Push";

export const booksRoutes = {
  path: "books",
  element: <Outlet />,
  children: [
    { path: "add-book", element: <CreateBookOwnerPage /> },
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
