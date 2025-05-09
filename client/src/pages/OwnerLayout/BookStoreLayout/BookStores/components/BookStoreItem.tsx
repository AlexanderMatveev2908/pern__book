import InfoCardStats from "@/components/elements/cards/bookstore/itemList/InfoCardStats";
import InfoCardStore from "@/components/elements/cards/bookstore/itemList/InfoCardStore/InfoCardStore";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import ItemID from "@/components/elements/cards/shared/ItemID";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItem: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full  grid grid-cols-1 h-fit items-start border-[3px] gap-y-5 border-blue-600 p-3 rounded-xl max-w-[400px] min-w-[300px] justify-self-center">
      <ItemID {...{ ID: el.id }} />
      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-5">
        <div className="w-full grid grid-cols-1 h-fit items-start">
          <ImagesItem {...{ images: el.images }} />
        </div>

        <div className="w-full grid grid-cols-1 sm:h-fit sm:items-start">
          <InfoCardStore {...{ el }} />
          <InfoCardStats {...{ el }} />
        </div>
      </div>
    </div>
  );
};

export default BookStoreItem;
