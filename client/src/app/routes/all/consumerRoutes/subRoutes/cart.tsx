import CartLayout from "@/app/layouts/ConsumerLayout/subLayouts/CartLayout";
import Push from "@/app/routes/helpers/Push";
import CartPage from "@/pages/ConsumerLayout/CartLayout/CartPage/CartPage";

export const cartRoutes = {
  path: "cart",
  element: <CartLayout />,
  children: [
    {
      index: true,
      element: <CartPage />,
    },

    {
      path: "*",
      element: <Push />,
    },
  ],
};
