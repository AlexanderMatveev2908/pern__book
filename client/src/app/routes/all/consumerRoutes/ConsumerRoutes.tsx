import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import cartRoutes from "./subRoutes/CartRoutes";
import { Outlet } from "react-router-dom";
import BookListConsumer from "@/pages/ConsumerLayout/books/BooksListConsumer/BookListConsumer";
import BookPageConsumer from "@/pages/ConsumerLayout/books/BookPageConsumer/BookPageConsumer";

const consumerRoutes = {
  path: "consumer",
  element: <Outlet />,
  children: [
    {
      path: "books",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: (
            <SearchCtxProvider>
              <BookListConsumer />
            </SearchCtxProvider>
          ),
        },
        {
          path: ":bookID",
          element: <BookPageConsumer />,
        },
      ],
    },
    cartRoutes,
  ],
};

export default consumerRoutes;
