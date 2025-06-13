import { makeParams } from "@/core/lib/all/forms/processVals/general";
import { isArrOk } from "@/core/lib/lib";
import { SearchOrdersConsumerType } from "@/features/common/SearchBar/schemasZ/consumer/orders";
import apiSlice from "@/store/apiSlice";
import { OrderType } from "@/types/all/orders";
import {
  BaseResAPI,
  ReqQueryAPI,
  ResPaginationAPI,
  TagsAPI,
} from "@/types/types";

const B_URL = "/consumer/orders";

export const ordersConsumerSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersListConsumer: builder.query<
      BaseResAPI<ResPaginationAPI<{ orders: OrderType[] }>>,
      ReqQueryAPI<{ vals: SearchOrdersConsumerType; routeID: string }>
    >({
      query: ({ vals }) => ({
        url: `${B_URL}?${makeParams(vals)}`,
        method: "GET",
      }),
      providesTags: (res) => [
        ...(isArrOk(res?.orders)
          ? res!.orders.map((o) => ({
              type: TagsAPI.ORDERS_CONSUMER_LIST,
              id: o.id,
            }))
          : []),
        {
          type: TagsAPI.ORDERS_CONSUMER_LIST,
          id: "LIST",
        },
      ],
    }),
  }),
});
