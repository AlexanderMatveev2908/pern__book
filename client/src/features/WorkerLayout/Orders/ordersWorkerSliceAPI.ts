import { SearchOrdersWorkerType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { makeParams } from "@/core/lib/all/forms/processVals/general";
import { isArrOk } from "@/core/lib/lib";
import apiSlice from "@/store/apiSlice";
import { OrderStoreType } from "@/types/all/orders";
import {
  BaseResAPI,
  ReqQueryAPI,
  ResPaginationAPI,
  TagsAPI,
} from "@/types/types";

const B_URL = "/worker/orders";

export const ordersWorkerSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersWorker: builder.query<
      BaseResAPI<ResPaginationAPI<{ orders: OrderStoreType[] }>>,
      ReqQueryAPI<{ vals: SearchOrdersWorkerType; routeID: string }>
    >({
      query: ({ vals, routeID }) => ({
        url: `${B_URL}/${routeID}?${makeParams(vals)}`,
        method: "GET",
      }),
      providesTags: (res) => [
        ...(isArrOk(res?.orders)
          ? res!.orders.map((o) => ({
              type: TagsAPI.ORDERS_WORKER_LIST,
              id: o.id,
            }))
          : []),

        {
          type: TagsAPI.ORDERS_WORKER_LIST,
          id: "LIST",
        },
      ],
    }),
  }),
});
