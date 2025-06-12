/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchBar from "@/common/SearchBar/SearchBar";
import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import {
  fieldsInputOrdersWorker,
  filtersOrdersWorker,
  numericFiltersOrdersWorker,
  sortersOrdersWorker,
} from "@/features/common/SearchBar/fields/worker/orders";
import { schemaOrdersWorker } from "@/features/common/SearchBar/schemasZ/worker/orders";
import { ordersWorkerSliceAPI } from "@/features/WorkerLayout/Orders/ordersWorkerSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";

const OrdersListWorker: FC = () => {
  const { user } = useGetU();

  const { formSearchOrdersWorkerCtx: formCtx } = useFormCtxConsumer();
  const hook = ordersWorkerSliceAPI.useLazyGetAllOrdersWorkerQuery();
  const [_, res] = hook;

  return (
    <WrapPageAPI {...{ canStay: user?.isWorker }}>
      <BreadCrumb
        {...{
          els: [
            { label: "worker", path: "#" },
            { label: "Orders", path: "#" },
          ],
        }}
      />

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
          <div className="list_items_app"></div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default OrdersListWorker;
