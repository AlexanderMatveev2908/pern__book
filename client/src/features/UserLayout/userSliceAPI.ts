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

export const userSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
      providesTags: [TagsAPI.USER],
    }),
  }),
});

export const { useGetUserProfileQuery } = userSliceAPI;
