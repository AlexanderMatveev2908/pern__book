import ItemID from "@/components/elements/cards/shared/ItemID";
import { linksCardStore } from "@/features/OwnerLayout/bookStores/fields/card";
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
        <PairBtnsLink {...{ links: linksCardStore(el.id) }} />
      </div>
    </div>
  );
};

export default BookStoreItemOwner;
