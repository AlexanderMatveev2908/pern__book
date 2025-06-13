/* eslint-disable @typescript-eslint/no-explicit-any */
import { catchErr } from "@/core/lib/lib";
import { TagsAPI } from "@/types/types";
import { setAllItems } from "./dummySLice";
import apiSlice from "@/core/store/api/apiSlice";

export const dummySliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDummyData: builder.query<any, void>({
      query: () => ({
        url: `/dummy`,
        method: "GET",
      }),
      transformResponse: (res) => {
        return !res?.items?.length
          ? res
          : {
              ...res,
              items: res.items.map((el: any) => ({
                ...el,
                custom: "✌🏼",
              })),
            };
      },
      providesTags: (res) => {
        const isOk = !!res?.items?.length;

        return [
          ...(isOk
            ? res.items.map((item: any) => ({
                type: TagsAPI.DUMMY_LIST,
                id: item.id,
              }))
            : []),
          {
            type: TagsAPI.DUMMY_LIST,
            id: "LIST",
          },
        ];
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await catchErr(async () => {
          const { data } = await queryFulfilled;

          dispatch(setAllItems(data.items));
        });
      },
    }),
  }),
});
