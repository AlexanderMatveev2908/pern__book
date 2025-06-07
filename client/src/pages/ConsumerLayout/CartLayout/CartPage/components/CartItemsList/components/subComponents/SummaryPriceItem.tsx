import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import { calcPriceItem } from "@/core/lib/all/utils/calc";
import { priceFormatter } from "@/core/lib/lib";
import { CartItemType } from "@/types/all/Cart";
import type { FC } from "react";

type PropsType = {
  el: CartItemType;
};

const SummaryPriceItem: FC<PropsType> = ({ el }) => {
  return (
    <div
      className={`w-full grid grid-cols-1 gap-y-3 h-fit ${
        el.book?.deletedAt || +!el.book?.qty ? "opacity-50" : ""
      }`}
    >
      <WrapPairTxt
        {...{ arg: ["price per item", priceFormatter(el.book!.price)] }}
      />

      <WrapPairTxt {...{ arg: ["Quantity item", el.qty + ""] }} />

      <WrapPairTxt
        {...{
          arg: ["total price", calcPriceItem(el.qty, el.book!.price)],
        }}
      />
    </div>
  );
};

export default SummaryPriceItem;
