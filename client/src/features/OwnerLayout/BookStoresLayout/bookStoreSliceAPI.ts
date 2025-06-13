import { SearchStoreFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { makeParams } from "@/core/lib/all/forms/processVals/general";
import { catchErr } from "@/core/lib/lib";
import { userSliceAPI } from "@/features/UserLayout/userSliceAPI";
import apiSlice from "@/store/apiSlice";
import { BookStoreType } from "@/types/all/bookStore";
import {
  BaseResAPI,
  ReqQueryAPI,
  ResPaginationAPI,
  TagsAPI,
} from "@/types/types";

const BASE_URL = "/admin/bookstores";

export const bookStoreSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBookStore: builder.mutation<{ bookStoreID: string }, FormData>({
      query: (data: FormData) => ({
        url: BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [TagsAPI.USER],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        await catchErr(async () => {
          await queryFulfilled;

          dispatch(
            bookStoreSliceAPI.util.invalidateTags([
              {
                type: TagsAPI.BOOK_STORE_LIST,
                id: "LIST",
              },
            ])
          );
          dispatch(
            userSliceAPI.util.updateQueryData(
              "getUserProfile",
              undefined,
              (draft) => {
                draft.user.isOwner = true;
              }
            )
          );
        });
      },
    }),

    getBookStore: builder.query<
      BaseResAPI<{ bookStore: BookStoreType }>,
      string
    >({
      query: (bookStoreID: string) => ({
        url: `${BASE_URL}/${bookStoreID}`,
        method: "GET",
      }),
      providesTags: [TagsAPI.BOOK_STORE],
    }),

    getAllStores: builder.query<
      BaseResAPI<ResPaginationAPI<{ bookStores: BookStoreType[] }>>,
      ReqQueryAPI<{ vals: SearchStoreFormType }>
    >({
      query: ({ vals }) => {
        return {
          url: `${BASE_URL}?${makeParams(vals)}`,
          method: "GET",
        };
      },
      providesTags: (res) =>
        res?.bookStores?.length
          ? [
              ...res.bookStores.map((store) => ({
                type: TagsAPI.BOOK_STORE_LIST,
                id: store.id,
              })),
              { type: TagsAPI.BOOK_STORE_LIST, id: "LIST" },
            ]
          : [
              {
                type: TagsAPI.BOOK_STORE_LIST,
                id: "LIST",
              },
            ],
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   await catchErr(async () => {
      //     const { data } = await queryFulfilled;

      //     if (data?.bookStores?.length)
      //       dispatch(bookStoreSlice.actions.setBookStores(data.bookStores));
      //   });
      // },
    }),

    updateBookStore: builder.mutation<
      { bookStoreID: string },
      { bookStoreID: string; formData: FormData }
    >({
      query: ({ formData, bookStoreID }) => ({
        url: `${BASE_URL}/${bookStoreID}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: (_, __, { bookStoreID }) => [
        { type: TagsAPI.BOOK_STORE_LIST, id: bookStoreID },
        TagsAPI.BOOK_STORE,
        TagsAPI.USER,
      ],
      async onQueryStarted({ bookStoreID }, { queryFulfilled, dispatch }) {
        await catchErr(async () => {
          await queryFulfilled;

          dispatch(
            bookStoreSliceAPI.util.invalidateTags([
              {
                type: TagsAPI.BOOK_STORE_LIST,
                id: bookStoreID,
              },
              // {
              //   type: TagsAPI.STORES_INFO,
              // },
            ])
          );
        });
      },
    }),

    delStore: builder.mutation<BaseResAPI<BookStoreType>, string>({
      query: (bookStoreID) => ({
        url: BASE_URL + "/" + bookStoreID,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: TagsAPI.BOOK_STORE_LIST, id },
        { type: TagsAPI.USER },
      ],

      // invalidatesTags: [TagsAPI.USER],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await catchErr(async () => {
          await queryFulfilled;

          dispatch(
            bookStoreSliceAPI.util.updateQueryData(
              "getBookStore",
              id,
              (draft) => {
                draft.bookStore = null!;
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
        });
      },
    }),
    */
