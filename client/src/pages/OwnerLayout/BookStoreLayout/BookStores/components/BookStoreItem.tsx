import ItemID from "@/components/elements/cards/shared/ItemID";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import StoreItemList from "@/components/elements/cards/bookstore/StoreItemList";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItemOwner: FC<PropsType> = ({ el }) => {
  return (
    <div className="card">
      <div className="body_card">
        <ItemID {...{ ID: el.id }} />

        <StoreItemList {...{ el }} />
      </div>

      <div className="footer_card">
        <PairBtnsLink
          {...{
            ids: [
              `/owner/book-store/${el.id}`,
              `/owner/book-store/update/${el.id}`,
            ],
          }}
        />
      </div>
    </div>
  );
};

export default BookStoreItemOwner;
