import apiSlice from "@/store/apiSlice";
import { BookType } from "@/types/all/books";
import { BookStoreType } from "@/types/all/bookStore";
import {
  BaseResAPI,
  ReqQueryAPI,
  ResPaginationAPI,
  TagsAPI,
  UserRole,
} from "@/types/types";
import { SearchStoreFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { makeParams } from "@/core/lib/all/forms/formatters/general";

const B_URL = "/worker/books";

export const booksSliceWorkerAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfoStoreWorker: builder.query<
      BaseResAPI<{ bookStore: BookStoreType }>,
      string
    >({
      query: (storeID) => ({
        url: `${B_URL}/info-store/${storeID}`,
        method: "GET",
      }),
    }),
    addBookWorker: builder.mutation<
      BaseResAPI<void>,
      { data: FormData; bookStoreID: string }
    >({
      query: ({ data, bookStoreID }) => ({
        url: `${B_URL}/${bookStoreID}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [TagsAPI.JUNCTIONS_BOOK_STORE_USER_LIST],
    }),
    updateBookWorker: builder.mutation<
      BaseResAPI<void>,
      { formData: FormData; bookID: string }
    >({
      query: ({ formData, bookID }) => ({
        url: `${B_URL}/${bookID}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: [
        TagsAPI.JUNCTIONS_BOOK_STORE_USER_LIST,
        TagsAPI.BOOK_WORKER,
      ],
    }),
    deleteBookWorker: builder.mutation<BaseResAPI<void>, string>({
      query: (bookID) => ({
        url: `${B_URL}/${bookID}`,
        method: "DELETE",
      }),
    }),
    getBookWorker: builder.query<
      BaseResAPI<{ book: BookType }>,
      { bookID: string; roles?: UserRole[] }
    >({
      query: ({ bookID, roles = [UserRole.MANAGER, UserRole.EMPLOYEE] }) => ({
        url: `${B_URL}/${bookID}?roles=${roles.join(",")}`,
        method: "GET",
      }),
      providesTags: [TagsAPI.BOOK_WORKER],
    }),

    getAllBooksWorker: builder.query<
      BaseResAPI<ResPaginationAPI<{ books: BookType[] }>>, // Response type
      ReqQueryAPI<{ vals: SearchStoreFormType; routeID: string }> // Query params type
    >({
      query: ({ vals, routeID }) => ({
        url: `${B_URL}/${routeID}?${makeParams(vals)}`,
        method: "GET",
      }),
      providesTags: (res) => [
        ...(res?.books?.length
          ? res.books.map((el) => ({
              type: TagsAPI.BOOKS_WORKER_LIST,
              id: el.id,
            }))
          : []),
        {
          type: TagsAPI.BOOKS_WORKER_LIST,
          id: "LIST",
        },
      ],
    }),
  }),
});
