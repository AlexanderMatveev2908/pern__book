import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import { Outlet } from "react-router-dom";
import CreateBookOwner from "@/features/OwnerLayout/BooksLayout/pages/CreateBookOwner/CreateBookOwner";
import UpdateBookOwner from "@/features/OwnerLayout/BooksLayout/pages/UpdateBookOwner/UpdateBookOwner";
import BooksListOwner from "@/features/OwnerLayout/BooksLayout/pages/BooksListOwner/BooksListOwner";
import BookPageOwner from "@/features/OwnerLayout/BooksLayout/pages/BookPageOwner/BookPageOwner";
import { FB_404 } from "@/app/routes/helpers/FB";

export const booksRoutes = {
  path: "books",
  element: <Outlet />,
  children: [
    { path: "add-book", element: <CreateBookOwner /> },
    { path: "update/:bookID", element: <UpdateBookOwner /> },
    {
      path: "list",
      element: (
        <SearchCtxProvider>
          <BooksListOwner />
        </SearchCtxProvider>
      ),
    },
    { path: ":bookID", element: <BookPageOwner /> },
    FB_404(),
  ],
};
