import { handleAsyncQuery } from "@/core/lib/lib";
import apiSlice from "@/store/apiSlice";

export type RegisterParamsAPI = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ParamsLoginAPI = {
  email: string;
  password: string;
};

export type ParamsChoseNewPwd = {
  userID: string;
  token: string;
  password: string;
};

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser: RegisterParamsAPI) => ({
        url: "/auth/register",
        method: "POST",
        // RENAME "BODY" OF RTK QUERY TO "DATA" FOR AXIOS BASE_QUERY
        data: newUser,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }): Promise<void> {
        await handleAsyncQuery({ queryFulfilled, dispatch });
      },
    }),

    loginUser: builder.mutation({
      query: (user: ParamsLoginAPI) => ({
        url: "/auth/login",
        method: "POST",
        data: user,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }): Promise<void> {
        await handleAsyncQuery({ queryFulfilled, dispatch });
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    choseNewPwd: builder.mutation({
      query: (data: ParamsChoseNewPwd) => ({
        url: "/auth/recover-account",
        method: "PATCH",
        data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        await handleAsyncQuery({ queryFulfilled, dispatch });
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLoginUserMutation,
  useChoseNewPwdMutation,
} = authAPI;
