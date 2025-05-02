import apiSlice from "@/store/apiSlice";

export const bookStoreSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBookStore: builder.mutation<{ bookStoreID: string }, FormData>({
      query: (data: FormData) => ({
        url: "/admin-book-store",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useCreateBookStoreMutation } = bookStoreSliceAPI;
