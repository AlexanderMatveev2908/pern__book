import apiSlice from "@/store/apiSlice";

const testAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSome: builder.query({
      query: () => ({
        url: "/protected",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSomeQuery } = testAPI;
