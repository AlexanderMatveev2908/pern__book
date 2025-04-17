import apiSlice from "@/store/apiSlice";

const testAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSome: builder.query({
      query: () => ({
        url: "/test",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSomeQuery } = testAPI;
