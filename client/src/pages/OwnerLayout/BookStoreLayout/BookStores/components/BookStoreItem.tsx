import InfoCardStatsStore from "@/components/elements/cards/bookstore/itemList/InfoCardStatsStore";
import InfoCardStoreAllUsers from "@/components/elements/cards/bookstore/itemList/InfoCardStore/InfoCardStoreAllUsers";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import ItemID from "@/components/elements/cards/shared/ItemID";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import { linksCardStore } from "@/core/config/fieldsData/OwnerLayout/bookStore/card";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItemOwner: FC<PropsType> = ({ el }) => {
  return (
    <div className="child__card">
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
          <InfoCardStoreAllUsers {...{ el }} />
          <InfoCardStatsStore {...{ el, isOwner: true }} />
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: linksCardStore }} />
    </div>
  );
};

export default BookStoreItemOwner;
