import CheckoutLayout from "@/app/layouts/ConsumerLayout/subLayouts/CheckoutLayout";
import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import CheckoutPage from "@/pages/ConsumerLayout/CheckoutLayout/CheckoutPage/CheckoutPage";
import { Navigate } from "react-router-dom";

const checkoutRoutes = {
  path: "checkout",
  element: <CheckoutLayout />,
  children: [
    {
      path: ":orderID",
      element: (
        <SwapCtxProvider>
          <CheckoutPage />
        </SwapCtxProvider>
      ),
    },

    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
};

export default checkoutRoutes;
