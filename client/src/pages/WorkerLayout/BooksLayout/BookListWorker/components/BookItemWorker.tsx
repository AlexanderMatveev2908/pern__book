import InfoBookCard from "@/components/elements/cards/books/ItemList/InfoBookCard";
import InfoBookStore from "@/components/elements/cards/books/ItemList/InfoBookStore";
import InfoStatsBookCard from "@/components/elements/cards/books/ItemList/InfoStatsBookCard";
import DropStats from "@/components/elements/cards/shared/Drop/DropStats";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import ItemID from "@/components/elements/cards/shared/ItemID";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import { fieldsWorkFlowBook } from "@/core/config/fieldsData/cards/books/books";
import { workFlowLabel } from "@/core/config/fieldsData/general/labels";
import { linksBookCardWorker } from "@/core/config/fieldsData/WorkerLayout/books/card";
import { BookType } from "@/types/all/books";
import type { FC } from "react";

type PropsType = {
  el: BookType;
};

const BookItemWorker: FC<PropsType> = ({ el }) => {
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
          <DropStats
            {...{
              el: workFlowLabel,
              fields: fieldsWorkFlowBook(el),
              abs: true,
              border: true,
            }}
          />
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: linksBookCardWorker }} />
    </div>
  );
};

export default BookItemWorker;
