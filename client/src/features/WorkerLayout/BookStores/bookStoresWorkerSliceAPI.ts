import { SearchStoreFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { makeParams } from "@/core/lib/all/forms/formatters/general";
import apiSlice from "@/store/apiSlice";
import { BookStoreType } from "@/types/all/bookStore";
import {
  BaseResAPI,
  ReqQueryAPI,
  ResPaginationAPI,
  TagsAPI,
  UserRole,
} from "@/types/types";

const BASE_URL = "/worker/book-stores";

// ⚠️⚠️⚠️ I THOUGH SLICES BEING OBJECTS WOULD NOT HVE NAMING CONFLICT BEING NESTED, ACTUALLY I HAD CAUSE HERE THEY USED TO MAKE REQUEST TO ADMIN SERVER ROUTE, I DO NOT REALLY LIKE USE TOO LONGS NAMES BUT I WANT TO BE CLEAR OF WHAT I AM ACTUALLY DOING

export const bookStoresWorkerSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleStoreWorker: builder.query<
      BaseResAPI<{ bookStore: BookStoreType }>,
      { bookStoreID: string; roles?: UserRole[] }
    >({
      query: ({
        bookStoreID,
        roles = [UserRole.EMPLOYEE, UserRole.MANAGER],
      }) => ({
        url: `${BASE_URL}/${bookStoreID}?roles=${roles.join(",")}`,
        method: "GET",
      }),
      providesTags: [TagsAPI.BOOK_STORE_WORKER],
    }),

    updateBookStoreWorker: builder.mutation<
      BaseResAPI<void>,
      { formData: FormData; bookStoreID: string }
    >({
      query: ({ bookStoreID, formData }) => ({
        url: `${BASE_URL}/${bookStoreID}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: (_, __, { bookStoreID }) => [
        { type: TagsAPI.BOOK_STORE_WORKER_LIST, id: bookStoreID },
        TagsAPI.BOOK_STORE_WORKER,
      ],
    }),

    getAllStoresWorker: builder.query<
      BaseResAPI<ResPaginationAPI<{ bookStores: BookStoreType[] }>>,
      ReqQueryAPI<{ vals: SearchStoreFormType }>
    >({
      query: ({ vals }) => ({
        url: `${BASE_URL}?${makeParams(vals)}`,
        method: "GET",
      }),
      providesTags: (res) => [
        ...(!res?.bookStores?.length
          ? []
          : res.bookStores.map((el) => ({
              type: TagsAPI.BOOK_STORE_WORKER_LIST,
              id: el.id,
            }))),
        {
          type: TagsAPI.BOOK_STORE_WORKER_LIST,
          id: "LIST",
        },
      ],
    }),
  }),
});
