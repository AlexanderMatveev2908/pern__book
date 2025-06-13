import { FB_404 } from "@/app/routes/helpers/FB";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import OrderPageOwner from "@/features/OwnerLayout/OrdersLayout/pages/OrderPageOwner/OrderPageOwner";
import OrdersListOwner from "@/features/OwnerLayout/OrdersLayout/pages/OrdersListOwner/OrdersListOwner";
import UpdateOrderOwner from "@/features/OwnerLayout/OrdersLayout/pages/UpdateOrderOwner/UpdateOrderOwner";
import { Outlet } from "react-router-dom";

export const ordersRoutes = {
  path: "orders",
  element: <Outlet />,
  children: [
    {
      path: "list",
      element: (
        <SearchCtxProvider>
          <OrdersListOwner />
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
    FB_404(),
  ],
};
