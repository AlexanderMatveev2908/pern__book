import { handleAsyncQuery } from "@/core/lib/lib";
import apiSlice from "@/core/store/api/apiSlice";
import { TokenEventType } from "@/types/types";

export interface ParamsVerifyCB {
  token: string;
  userID: string;
  event: TokenEventType;
}

const VerifyCb = apiSlice.injectEndpoints({
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

    verifyNewEmail: builder.mutation({
      query: (data: ParamsVerifyCB) => ({
        url: "/verify/new-email",
        method: "PATCH",
        data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        handleAsyncQuery({ queryFulfilled, dispatch });
      },
    }),
  }),
});

export const {
  useVerifyAccountMutation,
  useVerifyEmailForgotPwdMutation,
  useVerifyNewEmailMutation,
} = VerifyCb;
