import apiSlice from "@/store/apiSlice";
import { BookType } from "@/types/all/books";
import { BaseResAPI, TagsAPI } from "@/types/types";

export const rootAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    clearManageToken: builder.mutation({
      query: () => ({
        url: "/user/security",
        method: "DELETE",
      }),
    }),
    getBooksByBestRating: builder.query<
      BaseResAPI<{
        books: {
          booksByRating: BookType[];
          booksRecent: BookType[];
          booksByPrice: BookType[];
        };
      }>,
      void
    >({
      query: () => ({
        url: "/consumer/books/home",
        method: "GET",
      }),
      providesTags: [TagsAPI.BOOKS_SEARCH_HOME],
    }),
  }),
});

export const { useClearManageTokenMutation } = rootAPI;
