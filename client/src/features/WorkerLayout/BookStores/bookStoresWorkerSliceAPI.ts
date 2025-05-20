import apiSlice from "@/store/apiSlice";
import { BookStoreType } from "@/types/all/bookStore";
import { BaseResAPI, ResPaginationAPI } from "@/types/types";

const BASE_URL = "/worker/book-stores";

// ⚠️⚠️⚠️ I THOUGH SLICES BEING OBJECTS WOULD NOT HVE NAMING CONFLICT BEING NESTED, ACTUALLY I HAD CAUSE HERE THEY USED TO MAKE REQUEST TO ADMIN SERVER ROUTE, I DO NOT REALLY LIKE USE TOO LONGS NAMES BUT I WANT TO BE CLEAR OF WHAT I AM ACTUALLY DOING

export const bookStoresWorkerSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoresWorker: builder.query<
      BaseResAPI<ResPaginationAPI<{ bookStores: BookStoreType[] }>>,
      void
    >({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
    }),
  }),
});
