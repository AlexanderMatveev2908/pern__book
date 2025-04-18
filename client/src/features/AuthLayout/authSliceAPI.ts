/* eslint-disable @typescript-eslint/no-explicit-any */
import { appInstance } from "@/config/axios";
import { removeStorage, saveStorage } from "@/lib/lib";
import apiSlice from "@/store/apiSlice";
import { StorageKeys, TagsAPI } from "@/types/types";
import authSlice from "./authSlice";

export type RegisterParamsAPI = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (someContent) => ({
        url: "/auth/login",
        method: "POST",
        data: someContent,
      }),
    }),
    registerUser: builder.mutation({
      query: (newUser: RegisterParamsAPI) => ({
        url: "/auth/register",
        method: "POST",
        // RENAME "BODY" OF RTK QUERY TO "DATA" FOR AXIOS BASE_QUERY
        data: newUser,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }): Promise<void> {
        const { data } = await queryFulfilled;

        saveStorage({ data: data.accessToken, key: StorageKeys.ACCESS });
        appInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data?.accessToken}`;

        dispatch(apiSlice.util.invalidateTags([TagsAPI.USER]));
      },
      // invalidatesTags: [TagsAPI.USER],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(authSlice.actions.logout());

        try {
          await queryFulfilled;
        } catch (err: any) {
          dispatch(authSlice.actions.login());
          throw err;
        }

        removeStorage();
        dispatch(apiSlice.util.resetApiState());
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLogoutUserMutation } = authAPI;
