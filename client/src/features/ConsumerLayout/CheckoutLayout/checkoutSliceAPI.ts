import apiSlice from "@/store/apiSlice";
import { CartType } from "@/types/all/Cart";
import { BaseResAPI } from "@/types/types";
import { CheckoutAddressType } from "./forms/schema";

const B_URL = "/consumer/checkout";

export const checkoutSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartCheckout: builder.query<BaseResAPI<{ cart: CartType }>, void>({
      query: () => ({
        url: B_URL,
        method: "GET",
      }),
    }),

    createOrder: builder.mutation<
      BaseResAPI<{ orderID: string }>,
      { code?: string; totPrice: number }
    >({
      query: ({ code, totPrice }) => ({
        url: B_URL,
        method: "POST",
        data: { code, totPrice },
      }),
    }),

    sendAddressOrder: builder.mutation<
      BaseResAPI<{ ghost: "👻" | "" }>,
      { data: CheckoutAddressType }
    >({
      query: ({ data }) => ({
        url: `${B_URL}/address`,
        method: "POST",
        data,
      }),
    }),
  }),
});
