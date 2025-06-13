/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaOrdersConsumer,
  SearchOrdersConsumerType,
} from "@/features/common/SearchBar/schemasZ/consumer/orders";
import SearchBar from "@/common/SearchBar/SearchBar";
import {
  fieldsInputOrdersConsumer,
  filtersOrdersConsumer,
  numericFiltersOrdersConsumer,
  sortersOrdersConsumer,
} from "@/features/common/SearchBar/fields/consumer/orders";
import { ordersConsumerSliceAPI } from "@/features/ConsumerLayout/OrdersLayout/ordersConsumerSliceAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import { isArrOk } from "@/core/lib/lib";
import OrderListItemConsumer from "./components/OrderListItemConsumer";

const OrdersListConsumer: FC = () => {
  const { user } = useGetU();

  const formCtx = useForm<SearchOrdersConsumerType>({
    resolver: zodResolver(schemaOrdersConsumer),
    mode: "onChange",
  });

  const hook = ordersConsumerSliceAPI.useLazyGetOrdersListConsumerQuery();
  const [_, res] = hook;
  const { data: { orders } = {} } = res ?? {};

  return (
    <WrapPageAPI {...{ canStay: user?.hasConsumerOrders }}>
      <BreadCrumb
        {...{
          els: [
            { label: "search", path: "#" },
            { label: "orders", path: "#" },
          ],
        }}
      />

      <div className="p_page -mb-[175px]">
        <FormProvider {...formCtx}>
          <SearchBar
            {...({
              txtInputs: fieldsInputOrdersConsumer,
              filters: filtersOrdersConsumer,
              numericFilters: numericFiltersOrdersConsumer,
              sorters: sortersOrdersConsumer,
              schema: schemaOrdersConsumer,
              hook,
            } as any)}
          />
        </FormProvider>

        <WrapperContentAPI {...({ formCtx, hook } as any)}>
          {isArrOk(orders) && (
            <div className="list_items_app">
              {orders!.map((o) => (
                <OrderListItemConsumer key={o.id} {...{ o }} />
              ))}
            </div>
          )}
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default OrdersListConsumer;
