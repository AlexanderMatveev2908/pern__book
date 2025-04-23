import apiSlice from "@/store/apiSlice";

export const rootAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    clearManageToken: builder.mutation({
      query: () => ({
        url: "/user/security",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useClearManageTokenMutation } = rootAPI;
