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
      BaseResAPI<{ books: BookType[] }>,
      void
    >({
      query: () => ({
        url: "/search/best-avg-rating",
        method: "GET",
      }),
      providesTags: (res) => [
        ...(res?.books?.length
          ? res.books.map((el) => ({
              type: TagsAPI.BOOKS_BEST_RATING,
              id: el.id,
            }))
          : []),
        {
          type: TagsAPI.BOOKS_BEST_RATING,
          id: "LIST",
        },
      ],
    }),
  }),
});

export const { useClearManageTokenMutation } = rootAPI;
