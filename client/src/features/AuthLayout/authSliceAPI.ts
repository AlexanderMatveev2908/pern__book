import { appInstance } from "@/config/axios";
import { cg, saveStorage } from "@/lib/lib";
import apiSlice from "@/store/apiSlice";
import { StorageKeys, TagsAPI } from "@/types/types";

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

        cg("query started", data);

        saveStorage({ data: data.accessToken, key: StorageKeys.ACCESS });
        appInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data?.accessToken}`;

        dispatch(apiSlice.util.invalidateTags([TagsAPI.USER]));
      },
      // invalidatesTags: [TagsAPI.USER],
    }),
  }),
});

export const { useRegisterUserMutation } = authAPI;
