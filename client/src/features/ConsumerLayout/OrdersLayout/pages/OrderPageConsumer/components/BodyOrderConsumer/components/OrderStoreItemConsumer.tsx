import SpanPageInfo from "@/components/elements/cards/shared/SpanPageInfo";
import { fieldsBodyOrderStore } from "@/features/ConsumerLayout/OrdersLayout/fields/orderPage";
import { OrderStoreType } from "@/types/all/orders";
import type { FC } from "react";

type PropsType = {
  os: OrderStoreType;
};

const OrderStoreItemConsumer: FC<PropsType> = ({ os }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <div className="w-full p-5 border-[3px] border-blue-600 rounded-xl grid grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-10">
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
      </div>
    </div>
  );
};

export default OrderStoreItemConsumer;
