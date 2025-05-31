import { SearchBooksConsumerType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { makeParams } from "@/core/lib/all/forms/formatters/general";
import apiSlice from "@/store/apiSlice";
import { BookType } from "@/types/all/books";
import {
  BaseResAPI,
  ReqQueryAPI,
  ResPaginationAPI,
  TagsAPI,
} from "@/types/types";

const B_URL = "/consumer";

export const consumerSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooksConsumer: builder.query<
      BaseResAPI<ResPaginationAPI<{ books: BookType[] }>>,
      ReqQueryAPI<{ vals: SearchBooksConsumerType }>
    >({
      query: ({ vals }) => ({
        url: `${B_URL}?${makeParams(vals)}`,
        method: "GET",
      }),
      providesTags: (res) => [
        ...(!res?.books?.length
          ? []
          : res.books.map((el) => ({
              type: TagsAPI.BOOKS_CONSUMER_LIST,
              id: el.id,
            }))),
        {
          type: TagsAPI.BOOKS_CONSUMER_LIST,
          id: "LIST",
        },
      ],
    }),
  }),
});
