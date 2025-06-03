import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll";
import { isArrOk } from "@/core/lib/lib";
import { CartItemType } from "@/types/all/Cart";
import type { FC } from "react";
import WrapTxt from "./subComponents/WrapTxt";

type PropsType = {
  el: CartItemType;
};

const CartItem: FC<PropsType> = ({ el }) => {
  const { book } = el;

  return (
    <div className="w-full border-[3px] border-blue-600 rounded-xl p-3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
      {isArrOk(el!.book!.images) && (
        <ImagesScroll
          {...{
            images: book!.images,
            customStyleParent:
              "max-w-[100px] min-w-[100px] sm:max-w-[150px] sm:min-w-[150px] max-h-[100px] min-h-[100px] sm:min-h-[150px] max-h-[150px]",
          }}
        />
      )}
      <div className="w-full grid grid-cols-1 h-fit gap-y-3">
        <WrapTxt {...{ txt: book!.store!.name }} />
        <WrapTxt {...{ txt: book!.author }} />
        <WrapTxt {...{ txt: book!.title }} />
      </div>
    </div>
  );
};

export default CartItem;
