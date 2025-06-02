import CartLayout from "@/app/layouts/ConsumerLayout/subLayouts/CartLayout";
import CartPage from "@/pages/CartLayout/CartPage/CartPage";

const cartRoutes = {
  path: "cart",
  element: <CartLayout />,
  children: [
    {
      index: true,
      element: <CartPage />,
    },
  ],
};

export default cartRoutes;
