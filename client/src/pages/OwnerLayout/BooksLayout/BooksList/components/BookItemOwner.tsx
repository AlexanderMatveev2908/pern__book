import ItemID from "@/components/elements/cards/shared/ItemID";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import BookItemList from "@/components/elements/cards/books/BookItemList";
import { linksBookCard } from "@/features/OwnerLayout/books/fields/actions";

type PropsType = {
  el: BookType;
};

const BookItemOwner: FC<PropsType> = ({ el }) => {
  return (
    <div className="item">
      <ItemID {...{ ID: el.id }} />

      <BookItemList {...{ el, links: linksBookCard(el.id) }} />
    </div>
  );
};

export default BookItemOwner;
