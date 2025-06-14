import { OrderType } from "@/types/all/orders";
import type { FC } from "react";
import { fieldsAddressOrder } from "../../../fields/orderPageConsumer";
import SpanPageInfo from "@/components/elements/cards/shared/spans/SpanPageInfo";

type PropsType = {
  o: OrderType;
};

const SpanAddressOrder: FC<PropsType> = ({ o }) => {
  return (
    typeof o.orderedAt === "string" && (
      <div className="w-full grid grid-cols-1 gap-y-5 gap-x-10 border-[3px] border-neutral-800 rounded-xl p-5 lg:grid-cols-2">
        {fieldsAddressOrder(o).map((el) => (
          <SpanPageInfo
            key={el.id}
            {...{
              el: {
                label: el.label,
                val: el.val,
              },
              styleParent:
                "grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-2",
              txt: "txt__2",
            }}
          />
        ))}
      </div>
    )
  );
};

export default SpanAddressOrder;
