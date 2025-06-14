import SpanPageInfo from "@/components/elements/cards/shared/spans/SpanPageInfo";
import { fieldsBodyOrderStore } from "@/features/ConsumerLayout/OrdersLayout/fields/orderPageConsumer";
import { OrderStoreType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import OrderItemConsumer from "./components/OrderItemConsumer";
import { isObjOk } from "@/core/lib/lib";
import ErrCard from "@/components/elements/cards/shared/ErrCard";

type PropsType = {
  os: OrderStoreType;
  hasBeenOrdered?: boolean;
};

const OrderStoreItemConsumer: FC<PropsType> = ({ os, hasBeenOrdered }) => {
  const hasClosedActivity = useMemo(
    () => !isObjOk(os?.store) && !hasBeenOrdered,
    [os, hasBeenOrdered]
  );

  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <div
        className={`w-full p-5 border-[3px] rounded-xl grid grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-10 ${
          hasClosedActivity ? "border-red-600" : "border-gray-500"
        }`}
      >
        {fieldsBodyOrderStore(os).map((el) => (
          <SpanPageInfo
            key={el.id}
            {...{
              el: {
                icon: el.icon,
                label: el.label,
                val: el.val,
              },
              txt: "txt__3",
              styleSubParents: [null, "lg:justify-self-end"],
              styleParent: "grid-cols-[repeat(auto-fit,minmax(175px,1fr))]",
            }}
          />
        ))}

        {hasClosedActivity && (
          <div className="w-full lg:col-span-2">
            <ErrCard {...{ msg: "This store has closed his activity" }} />
          </div>
        )}
      </div>

      <div className="list_items_app">
        {(os?.orderItemStores ?? []).map((ois) => (
          <OrderItemConsumer key={ois.id} {...{ ois, hasBeenOrdered }} />
        ))}
      </div>
    </div>
  );
};

export default OrderStoreItemConsumer;
