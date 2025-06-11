/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/SearchBar/SearchBar";
import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import {
  fieldsInputOrders,
  filtersOrdersOwner,
  ownerNumericFiltersOrders,
  ownerSortersOrders,
} from "@/features/common/SearchBar/fields/owner/orders";
import { schemaOwnerOrders } from "@/features/common/SearchBar/schemasZ/owner/orders";
import { ownerOrdersSliceAPI } from "@/features/OwnerLayout/orders/ownerOrdersSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";

const OrdersList: FC = () => {
  const { user } = useGetU();

  const hook = ownerOrdersSliceAPI.useLazyGetOwnerOrdersListQuery();

  const { formSearchOrdersOwnerCtx: formCtx } = useFormCtxConsumer();

  return (
    <WrapPageAPI
      {...{
        canStay: user?.hasBusinessOrders,
      }}
    >
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
              txtInputs: fieldsInputOrders,
              filters: filtersOrdersOwner,
              numericFilters: ownerNumericFiltersOrders,
              sorters: ownerSortersOrders,
              // ? JUST A METAPHOR
              schema: schemaOwnerOrders,
            } as any)}
          />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default OrdersList;
