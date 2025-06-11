import Push from "@/app/routes/helpers/Push";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import OrderPageOwner from "@/pages/OwnerLayout/OrdersLayout/OrderPage/OrderPageOwner";
import OrdersList from "@/pages/OwnerLayout/OrdersLayout/OrdersList/OrdersList";
import UpdateOrderOwner from "@/pages/OwnerLayout/OrdersLayout/UpdateOrder/UpdateOrderOwner";
import { Outlet } from "react-router-dom";

export const ordersRoutes = {
  path: "orders",
  element: <Outlet />,
  children: [
    {
      path: "list",
      element: (
        <SearchCtxProvider>
          <OrdersList />
        </SearchCtxProvider>
      ),
    },
    {
      path: ":orderID",
      element: <OrderPageOwner />,
    },
    {
      path: "patch/:orderID",
      element: <UpdateOrderOwner />,
    },
    {
      path: "*",
      element: <Push />,
    },
  ],
};
