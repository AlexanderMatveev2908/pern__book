import CheckoutLayout from "@/app/layouts/ConsumerLayout/subLayouts/CheckoutLayout";
import { FB_404 } from "@/app/routes/helpers/FB";
import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import CheckoutPage from "@/features/ConsumerLayout/CheckoutLayout/pages/CheckoutPage/CheckoutPage";

export const checkoutRoutes = {
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

    FB_404(),
  ],
};
