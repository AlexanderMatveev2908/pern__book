import apiSlice from "@/store/apiSlice";

const rootAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserProfileQuery } = rootAPI;
