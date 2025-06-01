import InfoBook from "@/components/elements/cards/books/InfoBook/InfoBook";
import ImagesItem from "@/components/elements/imagesHandlers/ImagesItem";
import ItemID from "@/components/elements/ItemID";
import LinksCard from "@/components/elements/LinksCard";
import { linksBookCardWorker } from "@/features/WorkerLayout/fields/books/card";
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
          <InfoBook {...{ el }} />
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: linksBookCardWorker }} />
    </div>
  );
};

export default BookItemWorker;
