import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStats from "../../shared/Drop/DropStats";
import DropStatsStatic from "../../shared/Drop/DropStatsStatic";
import {
  fieldsStatsRatingBook,
  labelBookRating,
  labelDataBook,
  labelGeneralStatsBook,
  showGeneralStatsBook,
} from "@/core/config/fieldsData/cards/books/books";

type PropsType = {
  el: BookType;
};

const DataBookDB: FC<PropsType> = ({ el }) => {
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

export default DataBookDB;
