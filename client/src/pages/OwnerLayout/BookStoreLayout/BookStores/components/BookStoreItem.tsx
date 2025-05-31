import InfoStoreAllUsersItem from "@/components/elements/cards/bookstore/InfoStoreAllUsersItem";
import InfoStoreItemBusiness from "@/components/elements/cards/bookstore/InfoStoreItemBusiness";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import ItemID from "@/components/elements/cards/shared/ItemID";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import { linksCardStore } from "@/features/OwnerLayout/fields/bookStore/card";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItemOwner: FC<PropsType> = ({ el }) => {
  return (
    <div className="c_card">
      <ItemID {...{ ID: el.id }} />
      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-5">
        <div className="w-full grid grid-cols-1 h-fit items-start">
          <ImagesItem {...{ images: el.images }} />
        </div>

        <div
          className={`w-full grid grid-cols-1 sm:h-fit sm:items-start ${
            el.images?.length ? "" : "-mt-5"
          }`}
        >
          <InfoStoreAllUsersItem {...{ el }} />
          <InfoStoreItemBusiness {...{ el, isOwner: true }} />
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: linksCardStore }} />
    </div>
  );
};

export default BookStoreItemOwner;
