import ItemID from "@/components/elements/cards/bookstore/itemsList/ItemID";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItem: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full grid grid-cols-1 border-[3px] border-blue-600 p-3 rounded-xl">
      <ItemID {...{ ID: el.id }} />
    </div>
  );
};

export default BookStoreItem;
