import ItemID from "@/components/elements/cards/shared/ItemID";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import BookItemList from "@/components/elements/cards/books/BookItemList";

type PropsType = {
  el: BookType;
};

const BookItemOwner: FC<PropsType> = ({ el }) => {
  return (
    <div className="c_card">
      <ItemID {...{ ID: el.id }} />

      <BookItemList {...{ el }} />
    </div>
  );
};

export default BookItemOwner;
