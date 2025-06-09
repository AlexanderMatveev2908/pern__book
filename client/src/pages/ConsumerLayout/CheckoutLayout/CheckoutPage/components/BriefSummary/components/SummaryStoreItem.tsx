import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import { getExpectedDeliveredDay } from "@/core/lib/all/utils/calc";
import { priceFormatter } from "@/core/lib/lib";
import { OrderStoreType } from "@/types/all/orders";
import type { FC } from "react";

type PropsType = {
  el: OrderStoreType;
};

const SummaryStoreItem: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full flex flex-col items-center pl-4 border-l-2 border-blue-600">
      <div className="w-full grid grid-cols-1 gap-y-3">
        <WrapPairTxt
          {...{
            arg: ["Seller", el.store!.name],
          }}
        />

        <WrapPairTxt
          {...{
            arg: [
              "expected arrival date",
              getExpectedDeliveredDay({
                daysToAdd: el.store!.deliveryTime,
              }),
            ],
          }}
        />

        <WrapPairTxt {...{ arg: ["subtotal", priceFormatter(el.amount)] }} />

        <WrapPairTxt
          {...{
            arg: [
              "delivery price",
              priceFormatter(el.delivery, "Free Delivery"),
            ],
          }}
        />

        <WrapPairTxt
          {...{
            arg: ["total", priceFormatter(+el.amount + +el.delivery)],
          }}
        />
      </div>
    </div>
  );
};

export default SummaryStoreItem;
