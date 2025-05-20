import apiSlice from "@/store/apiSlice";
import { BookStoreUserType } from "@/types/all/JunctionStoreUser";
import { BaseResAPI, ResPaginationAPI, TagsAPI } from "@/types/types";

const BASE_URL = "/worker/book-stores";

// ⚠️⚠️⚠️ I THOUGH SLICES BEING OBJECTS WOULD NOT HVE NAMING CONFLICT BEING NESTED, ACTUALLY I HAD CAUSE HERE THEY USED TO MAKE REQUEST TO ADMIN SERVER ROUTE, I DO NOT REALLY LIKE USE TOO LONGS NAMES BUT I WANT TO BE CLEAR OF WHAT I AM ACTUALLY DOING

export const bookStoresWorkerSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoresWorker: builder.query<
      BaseResAPI<ResPaginationAPI<{ bookStores: BookStoreUserType[] }>>,
      void
    >({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      providesTags: (res) => [
        ...(!res?.bookStores?.length
          ? []
          : res.bookStores.map((el) => ({
              type: TagsAPI.JUNCTIONS_BOOK_STORE_USER_LIST,
              id: el.id,
            }))),
        {
          type: TagsAPI.JUNCTIONS_BOOK_STORE_USER_LIST,
          id: "LIST",
        },
      ],
    }),
  }),
});
