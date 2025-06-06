import ItemID from "@/components/elements/cards/shared/ItemID";
import { linksBookCardWorker } from "@/features/WorkerLayout/Books/fields/card";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import BookItemList from "@/components/elements/cards/books/BookItemList";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";

type PropsType = {
  el: BookType;
  isOwner?: boolean;
};

const BookItemWorker: FC<PropsType> = ({ el }) => {
  return (
    <div className="card">
      <div className="body_card">
        <ItemID {...{ ID: el.id }} />

        <BookItemList {...{ el }} />
      </div>

      <div className="footer_card">
        <PairBtnsLink {...{ links: linksBookCardWorker(el.id) }} />
      </div>
    </div>
  );
};

export default BookItemWorker;
