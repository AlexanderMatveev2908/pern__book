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
import { makeParams } from "@/core/lib/all/forms/processVals/general";

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
      invalidatesTags: [
        { type: TagsAPI.BOOK_STORE_WORKER_LIST, id: "LIST" },
        { type: TagsAPI.BOOKS_WORKER_LIST, id: "LIST" },
        TagsAPI.BOOK_STORE_WORKER,
      ],
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
      invalidatesTags: (_, __, { bookID }) => [
        { type: TagsAPI.BOOK_STORE_WORKER_LIST, id: "LIST" },
        { type: TagsAPI.BOOKS_WORKER_LIST, id: bookID },
        TagsAPI.BOOK_STORE_WORKER,
        TagsAPI.BOOK_WORKER,
      ],
    }),
    deleteBookWorker: builder.mutation<BaseResAPI<void>, string>({
      query: (bookID) => ({
        url: `${B_URL}/${bookID}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, bookID) => [
        { type: TagsAPI.BOOK_STORE_WORKER_LIST, id: "LIST" },
        { type: TagsAPI.BOOKS_WORKER_LIST, id: bookID },
        TagsAPI.BOOK_STORE_WORKER,
      ],
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
      BaseResAPI<ResPaginationAPI<{ books: BookType[] }>>,
      ReqQueryAPI<{ vals: SearchStoreFormType; routeID: string }>
    >({
      query: ({ vals, routeID }) => ({
        url: `${B_URL}/list/${routeID}?${makeParams(vals)}`,
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
