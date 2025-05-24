import apiSlice from "@/store/apiSlice";
import { BookType } from "@/types/all/books";
import { BookStoreType } from "@/types/all/bookStore";
import { BaseResAPI, TagsAPI, UserRole } from "@/types/types";

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
  }),
});
