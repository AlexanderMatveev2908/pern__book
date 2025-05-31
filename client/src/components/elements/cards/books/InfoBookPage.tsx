import type { FC } from "react";
import { BookType } from "@/types/all/books";
import {
  fieldsWorkFlowBook,
  labelDescriptionBook,
} from "@/core/config/fieldsData/cards/books/books";
import { workFlowLabel } from "@/core/config/fieldsData/general/labels";
import ImagesScroll from "../shared/ImagesScroll";
import DropStats from "../shared/Drop/DropStats";
import InfoStoreFromBook from "./InfoBook/components/InfoStoreFromBook";

type PropsType = {
  book: BookType;
  hide?: boolean;
  AboutBook: FC<{
    el: BookType;
    abs?: boolean;
  }>;
  BookDataDB: FC<{
    el: BookType;
  }>;
};

const InfoBookPage: FC<PropsType> = ({ book, AboutBook, BookDataDB }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-10">
      <ImagesScroll {...{ images: book.images }} />

      <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
          <AboutBook {...{ el: book }} />
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          <BookDataDB {...{ el: book }} />
        </div>

        <DropStats
          {...{ el: workFlowLabel, fields: fieldsWorkFlowBook(book) }}
        />

        <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 ">
          <InfoStoreFromBook {...{ el: book }} />

          <DropStats
            {...{
              el: labelDescriptionBook,
              fields: null,
              styleUL: "max-h-[200px] scroll_app scroll_y overflow-y-auto",
            }}
          >
            <li className="w-full flex justify-start pr-5">
              <span className="txt__2">{book?.description ?? "N/A"}</span>
            </li>
          </DropStats>
        </div>
      </div>
    </div>
  );
};

export default InfoBookPage;
