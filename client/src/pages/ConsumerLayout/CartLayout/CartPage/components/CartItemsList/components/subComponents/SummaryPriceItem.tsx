import { calcPriceItem, priceFormatter } from "@/core/lib/lib";
import { CartItemType } from "@/types/all/Cart";
import { X } from "lucide-react";
import type { FC } from "react";

type PropsType = {
  el: CartItemType;
};

const SummaryPriceItem: FC<PropsType> = ({ el }) => {
  return (
    <div className="summary_cart_item w-full grid grid-cols-2 items-center justify-items-center">
      <div className="w-full flex justify-between items-center">
        <span className="txt__2 justify-self-start">
          {priceFormatter(el.book!.price)}
        </span>

        <X className="icon__md" />

        <span className="txt__2">{el.qty}</span>
      </div>

      <span className="txt__2 justify-self-end">
        {calcPriceItem(el.qty, el.book!.price)}
      </span>
    </div>
  );
};

export default SummaryPriceItem;
