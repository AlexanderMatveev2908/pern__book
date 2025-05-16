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
    }),
  }),
});
