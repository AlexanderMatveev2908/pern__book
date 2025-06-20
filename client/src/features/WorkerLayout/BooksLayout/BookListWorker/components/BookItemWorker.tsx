import ItemID from "@/components/elements/cards/shared/spans/ItemID";
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
    <div className="card border-neutral-800">
      <div className="body_card">
        <ItemID {...{ ID: el.id }} />

        <BookItemList {...{ el }} />
      </div>

      <div className="footer_card">
        <PairBtnsLink
          {...{ ids: [`/worker/books/${el.id}`, `/worker/books/put/${el.id}`] }}
        />
      </div>
    </div>
  );
};

export default BookItemWorker;
