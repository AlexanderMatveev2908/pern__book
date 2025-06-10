import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import cartRoutes from "./subRoutes/CartRoutes";
import { Navigate, Outlet } from "react-router-dom";
import BookListConsumer from "@/pages/ConsumerLayout/BooksLayout/BooksListConsumer/BookListConsumer";
import BookPageConsumer from "@/pages/ConsumerLayout/BooksLayout/BookPageConsumer/BookPageConsumer";
import checkoutRoutes from "./subRoutes/CheckoutRoutes";

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
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
    cartRoutes,
    checkoutRoutes,
  ],
};

export default consumerRoutes;
