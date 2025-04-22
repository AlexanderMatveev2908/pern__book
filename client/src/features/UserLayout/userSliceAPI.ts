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

    updateProfile: builder.mutation({
      query: (data: FormData) => ({
        url: "/user/profile",
        method: "PATCH",
        data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(userSliceAPI.util.invalidateTags([TagsAPI.USER]));
      },
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateProfileMutation } =
  userSliceAPI;
