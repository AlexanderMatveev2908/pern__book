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
        url: "/auth/verify-account",
        method: "POST",
        data: params,
      }),
    }),
    // getSomething: builder.query({
    //   query: () => ({
    //     url: "/auth/verify-account",
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const { useVerifyAccountMutation } = verifyCbAPI;
