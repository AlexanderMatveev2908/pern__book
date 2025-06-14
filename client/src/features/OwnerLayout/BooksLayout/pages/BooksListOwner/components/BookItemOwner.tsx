import ItemID from "@/components/elements/cards/shared/spans/ItemID";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import BookItemList from "@/components/elements/cards/books/BookItemList";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";

type PropsType = {
  el: BookType;
};

const BookItemOwner: FC<PropsType> = ({ el }) => {
  return (
    <div className="card">
      <div className="body_card">
        <ItemID {...{ ID: el.id }} />

        <BookItemList {...{ el }} />
      </div>

      <div className="footer_card">
        <PairBtnsLink
          {...{
            ids: [`/owner/books/${el.id}`, `/owner/books/update/${el.id}`],
          }}
        />
      </div>
    </div>
  );
};

export default BookItemOwner;
