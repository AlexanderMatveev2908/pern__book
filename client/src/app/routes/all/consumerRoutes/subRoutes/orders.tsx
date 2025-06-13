import OrdersLayout from "@/app/layouts/ConsumerLayout/subLayouts/OrdersLayout";
import Push from "@/app/routes/helpers/Push";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import OrderPageConsumer from "@/pages/ConsumerLayout/OrdersLayout/OrderPage/OrderPageConsumer";

export const ordersConsumerRoutes = {
  path: "orders",
  element: <OrdersLayout />,
  children: [
    {
      path: "list",
      element: (
        <SearchCtxProvider>
          <OrderPageConsumer />
        </SearchCtxProvider>
      ),
    },
    {
      path: "*",
      element: <Push />,
    },
  ],
};
