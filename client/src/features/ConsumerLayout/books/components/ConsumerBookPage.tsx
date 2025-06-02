import InfoBookAbout from "@/components/elements/cards/books/InfoBookAbout";
import RatingFancy from "@/components/elements/cards/shared/rating/RatingFancy";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll";
import { showGeneralStatsBook } from "@/core/config/fieldsData/books/cards";
import { labelInfo } from "@/core/config/fieldsData/labels/shared";
import { BookType } from "@/types/all/books";
import type { FC } from "react";

type PropsType = {
  book: BookType;
};

const ConsumerBookPage: FC<PropsType> = ({ book }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-10">
      <ImagesScroll {...{ images: book.images }} />

      <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
        <InfoBookAbout {...{ el: book }} />

        <DropStats {...{ el: labelInfo, fields: showGeneralStatsBook(book) }} />

        <RatingFancy {...{ el: book }} />
      </div>
    </div>
  );
};

export default ConsumerBookPage;
