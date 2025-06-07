import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll/ImagesScroll";
import { isArrOk } from "@/core/lib/lib";
import { CartItemType } from "@/types/all/Cart";
import type { FC } from "react";
import FormQty from "../subComponents/FormQty/FormQty";
import SummaryPriceItem from "../subComponents/SummaryPriceItem";
import SpanTitleCard from "@/components/elements/cards/shared/SpanTitleCard";
import { FaBook } from "react-icons/fa";
import s from "./CartItem.module.css";
import { MdError } from "react-icons/md";

type PropsType = {
  el: CartItemType;
};

const CartItem: FC<PropsType> = ({ el }) => {
  const { book } = el;

  return (
    <div className="w-full grid grid-cols-1 gap-y-5 border-[3px] border-neutral-800 rounded-xl p-5  h-fit">
      <SpanTitleCard
        {...{
          label: { label: book!.title, icon: FaBook },
          customStyleParent: el.book?.deletedAt ? "opacity-50" : "",
        }}
      />

      <div
        className={`${s.cart_item} w-full
         gap-x-10 gap-y-5 ${
           isArrOk(el!.book!.images) ? s.cart_item_with_imgs : ""
         } `}
      >
        {isArrOk(el!.book!.images) && (
          <ImagesScroll
            {...{
              images: book!.images,
              customStyleParent: `max-w-[100px] min-w-[100px] sm:max-w-[150px] sm:min-w-[150px] max-h-[100px] min-h-[100px] sm:min-h-[150px] max-h-[150px] ${
                el.book?.deletedAt ? "opacity-50" : ""
              }`,
            }}
          />
        )}

        <div className="w-full grid grid-cols-1 gap-y-4 gap-x-10 h-fit">
          <SummaryPriceItem {...{ el }} />

          {el?.book?.deletedAt && (
            <div className="w-full flex justify-center items-center gap-x-10">
              <MdError className="icon__xl text-red-600" />

              <span className="txt__3 pb-1 border-b-2 border-red-600">
                This book has been deleted
              </span>
            </div>
          )}
        </div>
      </div>

      <FormQty {...{ el }} />
    </div>
  );
};

export default CartItem;
