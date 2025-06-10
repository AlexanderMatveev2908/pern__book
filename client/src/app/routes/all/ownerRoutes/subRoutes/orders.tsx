import Push from "@/app/routes/helpers/Push";
import { Outlet } from "react-router-dom";

export const ownerOrdersRoutes = {
  path: "orders",
  element: <Outlet />,
  children: [
    {
      path: "",
      element: <Push />,
    },
  ],
};
