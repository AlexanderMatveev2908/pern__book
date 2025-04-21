import apiSlice from "@/store/apiSlice";
import { TagsAPI, UserType } from "@/types/types";

export const userSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserType, void>({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
      providesTags: [TagsAPI.USER],
    }),
  }),
});

export const { useGetUserProfileQuery } = userSliceAPI;
