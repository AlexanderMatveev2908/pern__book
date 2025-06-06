import ItemID from "@/components/elements/cards/shared/ItemID";
import { linksBookCardWorker } from "@/features/WorkerLayout/Books/fields/card";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import BookItemList from "@/components/elements/cards/books/BookItemList";

type PropsType = {
  el: BookType;
  isOwner?: boolean;
};

const BookItemWorker: FC<PropsType> = ({ el }) => {
  return (
    <div className="item">
      <ItemID {...{ ID: el.id }} />

      <BookItemList {...{ links: linksBookCardWorker(el.id), el }} />
    </div>
  );
};

export default BookItemWorker;
