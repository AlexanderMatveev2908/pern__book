import ImagesItem from "@/components/elements/imagesHandlers/ImagesItem";
import ItemID from "@/components/elements/cards/shared/ItemID";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import { linksBookCardWorker } from "@/features/WorkerLayout/Books/fields/card";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import BookItem from "@/components/elements/cards/books/BookItem";

type PropsType = {
  el: BookType;
  isOwner?: boolean;
};

const BookItemWorker: FC<PropsType> = ({ el, isOwner }) => {
  return (
    <div className="c_card">
      <ItemID {...{ ID: el.id }} />

      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-5">
        <div className="w-full grid grid-cols-1 h-fit items-start">
          <ImagesItem {...{ images: el.images }} />
        </div>

        <div
          className={`w-full grid grid-cols-1 gap-4 sm:h-fit sm:items-start ${
            el.images?.length ? "" : "-mt-5"
          }`}
        >
          <BookItem {...{ el, isOwner }} />
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: linksBookCardWorker }} />
    </div>
  );
};

export default BookItemWorker;
