import OrdersLayout from "@/app/layouts/ConsumerLayout/subLayouts/OrdersLayout";
import { FB_404 } from "@/app/routes/helpers/FB";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import OrdersListConsumer from "@/features/ConsumerLayout/OrdersLayout/pages/OrdersListConsumer/OrdersListConsumer";

export const ordersConsumerRoutes = {
  path: "orders",
  element: <OrdersLayout />,
  children: [
    {
      path: "list",
      element: (
        <SearchCtxProvider>
          <OrdersListConsumer />
        </SearchCtxProvider>
      ),
    },
    FB_404(),
  ],
};
