import { handleAsyncQuery } from "@/lib/lib";
import apiSlice from "@/store/apiSlice";
import { TokenEventType } from "@/types/types";

export interface ParamsVerifyAccount {
  token: string;
  userID: string;
  event: TokenEventType;
}

const verifyCbAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyAccount: builder.mutation({
      query: (params: ParamsVerifyAccount) => ({
        url: "/verify/verify-account",
        method: "PATCH",
        data: params,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        handleAsyncQuery({ queryFulfilled, dispatch });
      },
    }),
  }),
});

export const { useVerifyAccountMutation } = verifyCbAPI;
