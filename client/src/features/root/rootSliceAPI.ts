import { cg } from "@/lib/lib";
import apiSlice from "@/store/apiSlice";
import { TagsAPI, UserRole } from "@/types/types";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  isNewsLetter: boolean;
}

export const rootAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        const { data } = await queryFulfilled;

        cg("query started", data);
      },
      providesTags: [TagsAPI.USER],
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetUserProfileQuery } = rootAPI;
