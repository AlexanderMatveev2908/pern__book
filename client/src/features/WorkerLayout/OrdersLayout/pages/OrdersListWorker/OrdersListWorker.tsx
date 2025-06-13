/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchBar from "@/common/SearchBar/SearchBar";
import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { decapt, isArrOk } from "@/core/lib/lib";
import {
  fieldsInputOrdersWorker,
  filtersOrdersWorker,
  numericFiltersOrdersWorker,
  sortersOrdersWorker,
} from "@/features/common/SearchBar/fields/worker/orders";
import { schemaOrdersWorker } from "@/features/common/SearchBar/schemasZ/worker/orders";
import { ordersWorkerSliceAPI } from "@/features/WorkerLayout/OrdersLayout/ordersWorkerSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import OrderStoreItemWorker from "./components/OrderStoreItemWorker";
import SpinnerBtn from "@/components/elements/spinners/SpinnerBtn/SpinnerBtn";

const OrdersListWorker: FC = () => {
  const { user } = useGetU();

  const { formSearchOrdersWorkerCtx: formCtx } = useFormCtxConsumer();
  const hook = ordersWorkerSliceAPI.useLazyGetAllOrdersWorkerQuery();
  const [_, res] = hook;
  const { data: { orders } = {} } = res ?? {};

  return (
    <WrapPageAPI {...{ canStay: user?.isWorker }}>
      {res?.isLoading ? (
        <div className="w-full flex justify-start mt-5">
          <SpinnerBtn />
        </div>
      ) : (
        <BreadCrumb
          {...{
            els: [
              {
                label: decapt(
                  orders?.[0]?.store?.team?.[0]?.bookStoreUser?.role ?? "worker"
                ),
                path: "#",
              },
              { label: "Orders", path: "#" },
            ],
          }}
        />
      )}

      <div className="p_page -mb-[175px]">
        <FormProvider {...formCtx}>
          <SearchBar
            {...({
              schema: schemaOrdersWorker,
              hook,
              paramID: "bookStoreID",
              txtInputs: fieldsInputOrdersWorker,
              filters: filtersOrdersWorker,
              numericFilters: numericFiltersOrdersWorker,
              sorters: sortersOrdersWorker,
            } as any)}
          />
        </FormProvider>

        <WrapperContentAPI
          {...({ formCtx, hook, paramID: "bookStoreID" } as any)}
        >
          <div className="list_items_app">
            {isArrOk(orders) &&
              orders?.map((o) => (
                <OrderStoreItemWorker key={o.id} {...{ o }} />
              ))}
          </div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default OrdersListWorker;
