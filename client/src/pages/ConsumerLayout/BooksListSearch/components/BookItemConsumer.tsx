import ConsumerFieldsBook from "@/components/elements/cards/books/ConsumerFieldsBook";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import { linksBookConsumer } from "@/features/ConsumerLayout/fields/books/card";
import { BookType } from "@/types/all/books";
import type { FC } from "react";

type PropsType = {
  el: BookType;
};

const BookItemConsumer: FC<PropsType> = ({ el }) => {
  return (
    <div className="c_card">
      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-5">
        <div className="w-full grid grid-cols-1 h-fit items-start">
          <ImagesItem {...{ images: el.images }} />
        </div>

        <div
          className={`w-full grid grid-cols-1 sm:h-fit sm:items-start ${
            el.images?.length ? "" : "-mt-5"
          }`}
        >
          <ConsumerFieldsBook {...{ el }} />
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: linksBookConsumer, invalid: [1] }} />
    </div>
  );
};

export default BookItemConsumer;
