import Push from "@/app/routes/helpers/Push";
import OrdersList from "@/pages/OwnerLayout/OrdersLayout/OrdersList/OrdersList";
import { Outlet } from "react-router-dom";

export const ordersRoutes = {
  path: "orders",
  element: <Outlet />,
  children: [
    {
      path: "list",
      element: <OrdersList />,
    },
    {
      path: "*",
      element: <Push />,
    },
  ],
};
