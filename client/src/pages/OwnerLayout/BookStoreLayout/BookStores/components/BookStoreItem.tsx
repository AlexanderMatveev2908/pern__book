import ItemID from "@/components/elements/cards/shared/ItemID";
import { linksCardStore } from "@/features/OwnerLayout/bookStores/fields/card";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import StoreItemList from "@/components/elements/cards/bookstore/StoreItemList";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItemOwner: FC<PropsType> = ({ el }) => {
  return (
    <div className="item">
      <ItemID {...{ ID: el.id }} />
      <StoreItemList {...{ el, links: linksCardStore(el.id) }} />
    </div>
  );
};

export default BookStoreItemOwner;
