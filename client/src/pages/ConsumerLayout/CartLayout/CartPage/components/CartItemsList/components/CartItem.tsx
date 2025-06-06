import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll/ImagesScroll";
import { isArrOk } from "@/core/lib/lib";
import { CartItemType } from "@/types/all/Cart";
import type { FC } from "react";
import WrapPairTxt from "../../../../../../../components/elements/WrapPairTxt/WrapPairTxt";
import FormQty from "./subComponents/FormQty";
import SummaryPriceItem from "./subComponents/SummaryPriceItem";

type PropsType = {
  el: CartItemType;
};

const CartItem: FC<PropsType> = ({ el }) => {
  const { book } = el;

  return (
    <div
      className={`w-full border-[3px] border-neutral-800 rounded-xl p-3 grid grid-cols-1 gap-x-10 gap-y-5 cart_item ${
        isArrOk(el!.book!.images) ? "sm:grid-cols-2" : ""
      } `}
    >
      {isArrOk(el!.book!.images) && (
        <ImagesScroll
          {...{
            images: book!.images,
            customStyleParent:
              "max-w-[100px] min-w-[100px] sm:max-w-[150px] sm:min-w-[150px] max-h-[100px] min-h-[100px] sm:min-h-[150px] max-h-[150px]",
          }}
        />
      )}

      <div className="w-full grid grid-cols-1 gap-6">
        <div className="w-full h-fit gap-y-4 grid grid-cols-1">
          <WrapPairTxt {...{ arg: ["title", book!.title] }} />
        </div>

        <div className="w-full grid grid-cols-1 gap-y-4 gap-x-10">
          <SummaryPriceItem {...{ el }} />

          {el?.book?.deletedAt && (
            <div className="w-full flex justify-center">
              <span className="txt__3 border-b-2 border-red-600">
                This item has been removed from stock
              </span>
            </div>
          )}

          <FormQty {...{ el }} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
