import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import { Outlet } from "react-router-dom";
import BookListConsumer from "@/features/ConsumerLayout/BooksLayout/pages/BooksListConsumer/BookListConsumer";
import BookPageConsumer from "@/features/ConsumerLayout/BooksLayout/pages/BookPageConsumer/BookPageConsumer";
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
