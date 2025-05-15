import apiSlice from "@/store/apiSlice";
import { BookStoreType } from "@/types/all/bookStore";
import { BaseResAPI } from "@/types/types";

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
    }),
  }),
});
