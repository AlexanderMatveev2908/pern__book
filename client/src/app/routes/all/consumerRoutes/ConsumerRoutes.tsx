import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import { Outlet } from "react-router-dom";
import BookListConsumer from "@/pages/ConsumerLayout/BooksLayout/BooksListConsumer/BookListConsumer";
import BookPageConsumer from "@/pages/ConsumerLayout/BooksLayout/BookPageConsumer/BookPageConsumer";
import { cartRoutes } from "./subRoutes/cart";
import { checkoutRoutes } from "./subRoutes/checkout";
import Push from "../../helpers/Push";
import { ordersConsumerRoutes } from "./subRoutes/orders";

export const consumerRoutes = {
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
          element: <Push />,
        },
      ],
    },
    cartRoutes,
    checkoutRoutes,
    ordersConsumerRoutes,
  ],
};
