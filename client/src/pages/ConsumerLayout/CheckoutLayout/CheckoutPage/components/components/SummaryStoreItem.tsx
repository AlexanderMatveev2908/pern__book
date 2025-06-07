import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import { getExpectedDeliveredDay } from "@/core/lib/all/utils/calc";
import { priceFormatter } from "@/core/lib/lib";
import { useCalcSubtotalStore } from "@/features/ConsumerLayout/CartLayout/hooks/useCalcSubtotalStore";
import { BookStoreType } from "@/types/all/bookStore";
import { CartItemType } from "@/types/all/Cart";
import type { FC } from "react";

type PropsType = {
  store: BookStoreType;
  items: CartItemType[];
};

const SummaryStoreItem: FC<PropsType> = ({ store, items }) => {
  const { subTotal, deliveryPrice } = useCalcSubtotalStore({ items, store });

  return !subTotal ? null : (
    <div className="w-full flex flex-col items-center pl-4 border-l-2 border-blue-600">
      <div className="w-full grid grid-cols-1 gap-y-3">
        <WrapPairTxt
          {...{
            arg: ["Seller", store!.name],
          }}
        />

        <WrapPairTxt
          {...{
            arg: [
              "expected arrival date",
              getExpectedDeliveredDay({
                daysToAdd: store!.deliveryTime,
              }),
            ],
          }}
        />

        <WrapPairTxt {...{ arg: ["subtotal", priceFormatter(subTotal)] }} />

        <WrapPairTxt
          {...{
            arg: [
              "delivery price",
              priceFormatter(deliveryPrice, "Free Delivery"),
            ],
          }}
        />

        <WrapPairTxt
          {...{
            arg: ["total", priceFormatter(subTotal + deliveryPrice)],
          }}
        />
      </div>
    </div>
  );
};

export default SummaryStoreItem;
