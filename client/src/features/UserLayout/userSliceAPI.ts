import apiSlice from "@/store/apiSlice";
import { TagsAPI, UserType } from "@/types/types";
import { PwdSecurityForm } from "./SecurityPwd";
import { catchErr } from "@/lib/lib";

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
        await catchErr(async () => {
          await queryFulfilled;
          dispatch(userSliceAPI.util.invalidateTags([TagsAPI.USER]));
        });
      },
    }),

    getRightManageAccount: builder.mutation({
      query: (data: PwdSecurityForm) => ({
        url: "/user/security",
        method: "POST",
        data,
      }),
    }),

    updateEmail: builder.mutation({
      query: (data: { email: string; token: string }) => ({
        url: "/user/update-email",
        method: "PATCH",
        data,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useGetRightManageAccountMutation,
  useUpdateEmailMutation,
} = userSliceAPI;
