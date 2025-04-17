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

const rootAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
      providesTags: [TagsAPI.USER],
    }),
  }),
  // updateUserProfile: builder.mutation({
  //   query: (data) => ({
  //     url: "/user/profile",
  //     method: "PUT",
  //     data,
  //   }),
  //   invalidatesTags: ["User"],
  // }),
});

export const { useGetUserProfileQuery } = rootAPI;
