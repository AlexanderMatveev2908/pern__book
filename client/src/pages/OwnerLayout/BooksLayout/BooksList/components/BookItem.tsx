import InfoBookCard from "@/components/elements/cards/books/ItemList/InfoBookCard";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import ItemID from "@/components/elements/cards/shared/ItemID";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import InfoStatsBookCard from "@/components/elements/cards/books/ItemList/InfoStatsBookCard";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import { linksBookCard } from "@/core/config/fieldsData/OwnerLayout/books/read";
import InfoBookStore from "@/components/elements/cards/books/ItemList/InfoBookStore";

type PropsType = {
  el: BookType;
};

const BookItem: FC<PropsType> = ({ el }) => {
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
          <InfoBookCard {...{ el }} />
          <InfoStatsBookCard {...{ el }} />
          <InfoBookStore {...{ el }} />
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: linksBookCard }} />
    </div>
  );
};

export default BookItem;
