import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStatsStatic from "../../shared/DropStatsStatic";
import {
  fieldsStatsRatingBook,
  labelBookRating,
  labelDataBook,
  labelGeneralStatsBook,
  showGeneralStatsBook,
} from "@/core/config/fieldsData/OwnerLayout/books/read";
import DropStats from "../../shared/DropStats";

type PropsType = {
  el: BookType;
};

const InfoStatsBookCard: FC<PropsType> = ({ el }) => {
  return (
    <DropStatsStatic {...{ el: labelGeneralStatsBook, border: true }}>
      <DropStats
        {...{
          el: labelBookRating,
          abs: true,
          fields: fieldsStatsRatingBook(el),
        }}
      />

      <DropStats
        {...{ el: labelDataBook, abs: true, fields: showGeneralStatsBook(el) }}
      />
    </DropStatsStatic>
  );
};

export default InfoStatsBookCard;
