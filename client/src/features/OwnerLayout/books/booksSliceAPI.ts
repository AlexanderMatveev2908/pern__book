/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchBooksOwnerType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { makeParams } from "@/core/lib/all/forms/processVals/general";
import { catchErr } from "@/core/lib/lib";
import { userSliceAPI } from "@/features/UserLayout/userSliceAPI";
import apiSlice from "@/store/apiSlice";
import { BookType } from "@/types/all/books";
import { BookStoreType } from "@/types/all/bookStore";
import {
  BaseResAPI,
  ReqQueryAPI,
  ResPaginationAPI,
  TagsAPI,
} from "@/types/types";

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
      // providesTags: [TagsAPI.STORES_INFO],
    }),

    createBook: builder.mutation<BaseResAPI<void>, FormData>({
      query: (data: FormData) => ({
        url: BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [
        {
          type: TagsAPI.BOOK_STORE_LIST,
          id: "LIST",
        },
        TagsAPI.BOOK_STORE,
        TagsAPI.BOOKS_OWNER_LIST,
      ],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await catchErr(async () => {
          await queryFulfilled;
          dispatch(
            userSliceAPI.util.updateQueryData(
              "getUserProfile",
              undefined,
              (draft) => {
                draft.user.hasBooks = true;
              }
            )
          );
        });
      },
    }),

    // getInfoBook: builder.query<BaseResAPI<{ book: BookType }>, string>({
    //   query: (bookID: string) => ({
    //     url: `${BASE_URL}/info/${bookID}`,
    //     method: "GET",
    //   }),
    //   providesTags: [TagsAPI.BOOK_OWNER],
    // }),

    updateBook: builder.mutation<
      BaseResAPI<void>,
      { formData: FormData; bookID: string }
    >({
      query: ({ formData, bookID }) => ({
        url: `${BASE_URL}/${bookID}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: (_, __, { bookID }) => [
        { type: TagsAPI.BOOK_STORE_LIST, id: "LIST" },
        { type: TagsAPI.BOOKS_OWNER_LIST, id: bookID },
        TagsAPI.BOOK_STORE,
        TagsAPI.BOOK_OWNER,
      ],
    }),

    getSingleBook: builder.query<BaseResAPI<{ book: BookType }>, string>({
      query: (bookID) => ({
        url: `${BASE_URL}/${bookID}`,
        method: "GET",
      }),
      providesTags: [TagsAPI.BOOK_OWNER],
    }),

    deleteBook: builder.mutation<BaseResAPI<void>, string>({
      query: (bookID) => ({
        url: `${BASE_URL}/${bookID}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, arg) => [
        { type: TagsAPI.BOOK_STORE_LIST, id: "LIST" },
        { type: TagsAPI.BOOKS_OWNER_LIST, id: arg },
        TagsAPI.BOOK_STORE,
        TagsAPI.USER,
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await catchErr(async () => {
          await queryFulfilled;

          dispatch(
            booksSLiceAPI.util.updateQueryData("getSingleBook", id, (draft) => {
              // draft.book = {
              //   id: draft.book.id,
              // } as any;
              draft.ninja = "🥷🏼";
            })
          );
          // dispatch(
          //   booksSLiceAPI.util.updateQueryData("getInfoBook", id, (draft) => {
          //     draft.ninja = "🥷🏼";
          //   })
          // );
        });
      },
    }),

    getAllBooks: builder.query<
      BaseResAPI<ResPaginationAPI<{ books: BookType[] }>>,
      ReqQueryAPI<{ vals: SearchBooksOwnerType }>
    >({
      query: ({ vals }) => {
        return {
          url: BASE_URL + `?${makeParams(vals)}`,
          method: "GET",
        };
      },
      providesTags: (res) =>
        res?.books?.length
          ? [
              ...res.books.map((el) => ({
                type: TagsAPI.BOOKS_OWNER_LIST,
                id: el.id,
              })),
              {
                type: TagsAPI.BOOKS_OWNER_LIST,
                id: "LIST",
              },
            ]
          : [
              {
                type: TagsAPI.BOOKS_OWNER_LIST,
                id: "LIST",
              },
            ],
    }),

    getListPDF: builder.query<any, void>({
      query: () => ({
        url: BASE_URL + "/pdf",
        method: "GET",
        responseType: "blob",
      }),
    }),
  }),
});
