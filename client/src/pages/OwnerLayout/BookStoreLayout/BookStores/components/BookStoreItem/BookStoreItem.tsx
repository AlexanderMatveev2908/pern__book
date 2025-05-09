import InfoCardStore from "@/components/elements/cards/bookstore/itemList/InfoCardStore";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import ItemID from "@/components/elements/cards/shared/ItemID";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItem: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full grid grid-cols-1 border-[3px] gap-y-5 border-blue-600 p-3 rounded-xl max-w-full">
      <ItemID {...{ ID: el.id }} />
      <div className="w-full grid grid-cols-1 gap-y-5">
        <ImagesItem {...{ images: el.images }} />

        <InfoCardStore {...{ el }} />
      </div>
    </div>
  );
};

export default BookStoreItem;
