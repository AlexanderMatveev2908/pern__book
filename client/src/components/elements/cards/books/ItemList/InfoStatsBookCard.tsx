import { BookType } from "@/types/all/books";
import type { FC } from "react";
import {
  fieldsStatsRatingBook,
  labelBookRating,
  labelDataBook,
  labelGeneralStatsBook,
  showGeneralStatsBook,
} from "@/core/config/fieldsData/OwnerLayout/books/read";
import DropStats from "../../shared/Drop/DropStats";
import DropStatsStatic from "../../shared/Drop/DropStatsStatic";

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
