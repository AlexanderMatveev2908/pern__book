import { SearchOrdersWorkerType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { makeParams } from "@/core/lib/all/forms/processVals/general";
import { __cg, catchErr, isArrOk } from "@/core/lib/lib";
import apiSlice from "@/core/store/api/apiSlice";
import { AllowedPatchOrderStages, OrderStoreType } from "@/types/all/orders";
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
        url: `${B_URL}/list/${routeID}?${makeParams(vals)}`,
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

    getWorkerOrder: builder.query<
      BaseResAPI<{ order: OrderStoreType }>,
      { orderID: string }
    >({
      query: ({ orderID }) => ({
        url: `${B_URL}/${orderID}`,
        method: "GET",
      }),
      providesTags: [TagsAPI.ORDER_WORKER],
    }),

    patchOrderWorker: builder.mutation<
      BaseResAPI<void>,
      { orderID: string; stage: AllowedPatchOrderStages }
    >({
      query: ({ orderID, stage }) => ({
        url: `${B_URL}/${orderID}`,
        method: "PATCH",
        data: { stage },
      }),

      async onQueryStarted({ orderID, stage }, { dispatch, queryFulfilled }) {
        await catchErr(async () => {
          const patched = dispatch(
            ordersWorkerSliceAPI.util.updateQueryData(
              "getWorkerOrder",
              { orderID },
              (draft) => {
                draft.order.stage = stage;
              }
            )
          );

          try {
            await queryFulfilled;
            dispatch(
              ordersWorkerSliceAPI.util.invalidateTags([
                {
                  type: TagsAPI.ORDERS_WORKER_LIST,
                  id: orderID,
                },
                TagsAPI.ORDER_WORKER,
              ])
            );
          } catch (err) {
            __cg("err patchOrderWorker", err);

            patched.undo();
          }
        });
      },
    }),
  }),
});
