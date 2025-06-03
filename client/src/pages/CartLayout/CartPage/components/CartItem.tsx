import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll";
import { isArrOk } from "@/core/lib/lib";
import { CartItemType } from "@/types/all/Cart";
import type { FC } from "react";

type PropsType = {
  el: CartItemType;
};

const CartItem: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full border-[3px] border-blue-600 rounded-xl p-3 grid grid-cols-1 sm:grid-cols-2">
      {isArrOk(el.book.images) && (
        <ImagesScroll
          {...{
            images: el.book.images,
            customStyleParent:
              "max-w-[100px] sm:max-w-[150px] max-h-[100px] min-h-[100px] sm:min-h-[150px] max-h-[150px]",
          }}
        />
      )}
      <div className=""></div>
    </div>
  );
};

export default CartItem;
