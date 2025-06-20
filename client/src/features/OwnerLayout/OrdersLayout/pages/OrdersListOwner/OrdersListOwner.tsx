/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/SearchBar/SearchBar";
import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { isArr } from "@/core/lib/lib";
import {
  fieldsInputOrdersOwner,
  filtersOrdersOwner,
  ownerNumericFiltersOrders,
  ownerSortersOrders,
} from "@/features/common/SearchBar/fields/owner/orders";
import { schemaOwnerOrders } from "@/features/common/SearchBar/schemasZ/owner/orders";
import { ownerOrdersSliceAPI } from "@/features/OwnerLayout/OrdersLayout/ownerOrdersSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import OrderStoreItemOwner from "./components/OrderStoreItemOwner";
import WrapApp from "@/components/HOC/WrapApp";

const OrdersListOwner: FC = () => {
  const { user } = useGetU();

  const hook = ownerOrdersSliceAPI.useLazyGetOwnerOrdersListQuery();
  const [_, res] = hook;
  const { data: { orders } = {} } = res ?? {};

  const { formSearchOrdersOwnerCtx: formCtx } = useFormCtxConsumer();

  return (
    <WrapApp
      {...{
        canStay: user?.hasBusinessOrders,
      }}
    >
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                { label: "admin", path: "#" },
                { label: "Orders", path: "#" },
              ],
            }}
          />

          <div className="p_page -mb-[175px]">
            <FormProvider {...formCtx}>
              <SearchBar
                {...({
                  hook,
                  txtInputs: fieldsInputOrdersOwner,
                  filters: filtersOrdersOwner,
                  numericFilters: ownerNumericFiltersOrders,
                  sorters: ownerSortersOrders,
                  schema: schemaOwnerOrders,
                } as any)}
              />
            </FormProvider>

            <WrapperContentAPI
              {...({ formCtx, hook, isSuccess: isArr(orders) } as any)}
            >
              {() => (
                <div className="list_items_app">
                  {orders!.map((os) => (
                    <OrderStoreItemOwner key={os.id} {...{ os }} />
                  ))}
                </div>
              )}
            </WrapperContentAPI>
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default OrdersListOwner;
