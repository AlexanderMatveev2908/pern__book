/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeParams } from "@/core/lib/all/forms/processVals/general";
import { isArrOk } from "@/core/lib/lib";
import apiSlice from "@/core/store/api/apiSlice";
import { OrderStoreType } from "@/types/all/orders";
import {
  BaseResAPI,
  ReqQueryAPI,
  ResPaginationAPI,
  TagsAPI,
} from "@/types/types";

const B_URL = "/admin/orders";

export const ownerOrdersSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnerOrdersList: builder.query<
      BaseResAPI<ResPaginationAPI<{ orders: OrderStoreType[] }>>,
      ReqQueryAPI<{ vals: any }>
    >({
      query: ({ vals }) => ({
        url: `${B_URL}?${makeParams(vals)}`,
        method: "GET",
      }),
      providesTags: (res) => [
        ...(!isArrOk(res?.orders)
          ? []
          : res!.orders.map((o) => ({
              type: TagsAPI.OWNER_ORDERS_LIST,
              id: o.id,
            }))),

        {
          type: TagsAPI.OWNER_ORDERS_LIST,
          id: "LIST",
        },
      ],
    }),

    getOrderOwner: builder.query<
      BaseResAPI<{ order: OrderStoreType }>,
      { orderID: string }
    >({
      query: ({ orderID }) => ({
        url: `${B_URL}/${orderID}`,
        method: "GET",
      }),
      providesTags: [TagsAPI.OWNER_ORDER],
    }),
  }),
});
