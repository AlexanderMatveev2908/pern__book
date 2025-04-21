import { handleAsyncQuery } from "@/lib/lib";
import apiSlice from "@/store/apiSlice";
import { TokenEventType } from "@/types/types";

export interface ParamsVerifyCB {
  token: string;
  userID: string;
  event: TokenEventType;
}

const verifyCbAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyAccount: builder.mutation({
      query: (params: ParamsVerifyCB) => ({
        url: "/verify/verify-account",
        method: "PATCH",
        data: params,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        handleAsyncQuery({ queryFulfilled, dispatch });
      },
    }),

    verifyEmailForgotPwd: builder.mutation({
      query: (data: ParamsVerifyCB) => ({
        url: "/verify/forgot-pwd",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useVerifyAccountMutation, useVerifyEmailForgotPwdMutation } =
  verifyCbAPI;
