import { __cg, catchErr } from "@/core/lib/lib";
import apiSlice from "@/store/apiSlice";
import { setBookStore } from "./bookStoreSlice";

export const bookStoreSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBookStore: builder.mutation<{ bookStoreID: string }, FormData>({
      query: (data: FormData) => ({
        url: "/admin-book-store",
        method: "POST",
        data,
      }),
    }),

    getBookStore: builder.mutation({
      query: (bookStoreID: string) => ({
        url: `/admin-book-store/${bookStoreID}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        catchErr(async () => {
          const { data } = await queryFulfilled;

          dispatch(setBookStore(data.bookStore));
          __cg("fulfilled", data);
        });
      },
    }),
  }),
});

export const { useCreateBookStoreMutation, useGetBookStoreMutation } =
  bookStoreSliceAPI;
