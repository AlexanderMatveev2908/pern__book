import apiSlice from "@/store/apiSlice";
import { BookStoreType } from "@/types/all/bookStore";
import { BaseResAPI } from "@/types/types";

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
  }),
});
