import { catchErr } from "@/core/lib/lib";
import apiSlice from "@/store/apiSlice";
import { BookType } from "@/types/all/books";
import { BookStoreType } from "@/types/all/bookStore";
import { BaseResAPI, TagsAPI } from "@/types/types";

const BASE_URL = "/admin-books";

export const booksSLiceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoresInfo: builder.query<
      BaseResAPI<{ stores: Partial<BookStoreType>[] }>,
      void
    >({
      query: () => ({
        url: `${BASE_URL}/stores-info`,
        method: "GET",
      }),
      providesTags: [TagsAPI.STORES_INFO],
    }),

    createBook: builder.mutation<BaseResAPI<void>, FormData>({
      query: (data: FormData) => ({
        url: BASE_URL,
        method: "POST",
        data,
      }),
    }),

    getInfoBook: builder.query<BaseResAPI<{ book: BookType }>, string>({
      query: (bookID: string) => ({
        url: `${BASE_URL}/info/${bookID}`,
        method: "GET",
      }),
      providesTags: [TagsAPI.BOOK_OWNER],
    }),

    updateBook: builder.mutation<
      BaseResAPI<void>,
      { formData: FormData; bookID: string }
    >({
      query: ({ formData, bookID }) => ({
        url: `${BASE_URL}/${bookID}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: [TagsAPI.BOOK_OWNER],
    }),

    deleteBook: builder.mutation<BaseResAPI<void>, string>({
      query: (bookID) => ({
        url: `${BASE_URL}/${bookID}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await catchErr(async () => {
          await queryFulfilled;

          dispatch(
            booksSLiceAPI.util.updateQueryData("getInfoBook", id, (draft) => {
              draft.ninja = "🥷🏼";
            })
          );
        });
      },
    }),
  }),
});
