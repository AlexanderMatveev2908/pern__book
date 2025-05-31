import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStatsStatic from "../Drop/DropStatsStatic";
import InfoBookAbout from "./InfoBook/components/InfoBookAbout";
import {
  labelBookCard,
  labelDataBook,
  labelGeneralStatsBook,
  showGeneralStatsBook,
} from "@/core/config/fieldsData/cards/books/books";
import DropStats from "../Drop/DropStats";
import RatingFancy from "../RatingFancy";

type PropsType = {
  el: BookType;
};

const ConsumerFieldsBook: FC<PropsType> = ({ el }) => {
  return (
    <>
      <DropStatsStatic {...{ el: labelBookCard(el.title), border: true }}>
        <InfoBookAbout {...{ el, border: true, abs: true }} />
      </DropStatsStatic>

      <DropStatsStatic {...{ el: labelGeneralStatsBook, border: true }}>
        <DropStats
          {...{
            el: labelDataBook,
            abs: true,
            fields: showGeneralStatsBook(el),
          }}
        />

        <RatingFancy {...{ el }} />
      </DropStatsStatic>
    </>
  );
};

export default ConsumerFieldsBook;
