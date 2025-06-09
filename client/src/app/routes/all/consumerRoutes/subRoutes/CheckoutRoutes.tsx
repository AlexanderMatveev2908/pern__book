import CheckoutLayout from "@/app/layouts/ConsumerLayout/subLayouts/CheckoutLayout";
import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import CheckoutPage from "@/pages/ConsumerLayout/CheckoutLayout/CheckoutPage/CheckoutPage";

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
  ],
};

export default checkoutRoutes;
