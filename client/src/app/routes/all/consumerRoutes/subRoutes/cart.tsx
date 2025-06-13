import CartLayout from "@/app/layouts/ConsumerLayout/subLayouts/CartLayout";
import { FB_404 } from "@/app/routes/helpers/FB";
import CartPage from "@/features/ConsumerLayout/CartLayout/pages/CartPage/CartPage";

export const cartRoutes = {
  path: "cart",
  element: <CartLayout />,
  children: [
    {
      path: "summary",
      element: <CartPage />,
    },

    FB_404(),
  ],
};
