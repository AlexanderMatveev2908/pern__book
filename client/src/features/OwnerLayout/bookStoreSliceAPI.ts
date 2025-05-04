import { catchErr } from "@/core/lib/lib";
import apiSlice from "@/store/apiSlice";
import { BookStoreType } from "@/types/all/bookStore";
import { BaseResAPI, TagsAPI } from "@/types/types";

const BASE_URL = "/admin-book-store/";

export const bookStoreSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBookStore: builder.mutation<{ bookStoreID: string }, FormData>({
      query: (data: FormData) => ({
        url: BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [TagsAPI.USER],
    }),

    getBookStore: builder.query<
      { bookStore: BookStoreType } & BaseResAPI,
      string
    >({
      query: (bookStoreID: string) => ({
        url: BASE_URL + bookStoreID,
        method: "GET",
      }),
      providesTags: [TagsAPI.BOOK_STORE],
    }),

    updateBookStore: builder.mutation<
      { bookStoreID: string },
      { bookStoreID: string; formData: FormData }
    >({
      query: ({ formData, bookStoreID }) => ({
        url: BASE_URL + bookStoreID,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: [TagsAPI.BOOK_STORE],
    }),

    delStore: builder.mutation<BaseResAPI, string>({
      query: (bookStoreID) => ({
        url: BASE_URL + bookStoreID,
        method: "DELETE",
      }),
      invalidatesTags: [TagsAPI.USER],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        catchErr(async () => {
          await queryFulfilled;

          dispatch(
            bookStoreSliceAPI.util.updateQueryData(
              "getBookStore",
              id,
              (draft) => {
                draft.bookStore = null!;
                draft.status = 418;
                draft.msg = "🥷🏼";
              }
            )
          );
        });
      },
    }),
  }),
});

export const {
  useCreateBookStoreMutation,
  useGetBookStoreQuery,
  useUpdateBookStoreMutation,
} = bookStoreSliceAPI;

/*
  ? EVEN IS NOT SEMANTICALLY CORRECT USING MUTATION FOR GET REQ WAS PRETTY USEFUL TO REMEMBER ENTITY ADAPTERS, THEY ARE USED FOR ASYNC THUNK MAINLY OR OPTIMIST UPDATES
  * THE ERROR I GET IS THAT I USED TO PASS SKIP TO REDUCER INSTEAD IT HAS TO BE PASSED AS OPT TO HOOK, THIS IN PROSPECT TO MAKE REQ ONLY WITH VALID ID THAT RESPECT UUID4
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
    */
