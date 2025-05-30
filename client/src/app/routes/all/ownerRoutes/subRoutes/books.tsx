import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import BooksOwnerLayout from "@/app/layouts/OwnerLayout/BooksOwnerLayout";
import BookPage from "@/pages/OwnerLayout/BooksLayout/BookPage/BookPage";
import BooksList from "@/pages/OwnerLayout/BooksLayout/BooksList/BooksList";
import CreateBook from "@/pages/OwnerLayout/BooksLayout/CreateBook/CreateBook";
import UpdateBook from "@/pages/OwnerLayout/BooksLayout/UpdateBook/UpdateBook";
import { Navigate } from "react-router-dom";

const booksRoutes = {
  path: "books",
  element: <BooksOwnerLayout />,
  children: [
    { path: "add-book", element: <CreateBook /> },
    { path: "update/:bookID", element: <UpdateBook /> },
    {
      path: "list",
      element: (
        <SearchCtxProvider>
          <BooksList />
        </SearchCtxProvider>
      ),
    },
    { path: ":bookID", element: <BookPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ],
};

export default booksRoutes;
