import apiSlice from "@/store/apiSlice";

export const ownerBookStoreSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBookStore: builder.mutation({
      query: (data: FormData) => ({
        url: "/admin-book-store",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useCreateBookStoreMutation } = ownerBookStoreSliceAPI;
