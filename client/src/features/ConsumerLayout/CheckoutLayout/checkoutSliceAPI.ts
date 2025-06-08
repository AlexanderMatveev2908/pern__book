import apiSlice from "@/store/apiSlice";
import { CartType } from "@/types/all/Cart";
import { BaseResAPI } from "@/types/types";

const B_URL = "/consumer/checkout";

export const checkoutSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartCheckout: builder.query<BaseResAPI<{ cart: CartType }>, void>({
      query: () => ({
        url: B_URL,
        method: "GET",
      }),
    }),
  }),
});
