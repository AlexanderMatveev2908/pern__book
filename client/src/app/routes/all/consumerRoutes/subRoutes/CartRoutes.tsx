import CartLayout from "@/app/layouts/ConsumerLayout/subLayouts/CartLayout";
import CartPage from "@/pages/ConsumerLayout/CartLayout/CartPage/CartPage";
import { Navigate } from "react-router-dom";

const cartRoutes = {
  path: "cart",
  element: <CartLayout />,
  children: [
    {
      index: true,
      element: <CartPage />,
    },

    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
};

export default cartRoutes;
