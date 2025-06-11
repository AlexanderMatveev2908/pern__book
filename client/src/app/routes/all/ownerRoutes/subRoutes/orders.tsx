import Push from "@/app/routes/helpers/Push";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import OrdersList from "@/pages/OwnerLayout/OrdersLayout/OrdersList/OrdersList";
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
      path: "*",
      element: <Push />,
    },
  ],
};
