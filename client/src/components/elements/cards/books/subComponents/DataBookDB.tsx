import { BookType } from "@/types/all/books";
import type { FC } from "react";
import {
  fieldsStatsRatingBook,
  labelBookRating,
  labelDataBook,
  showGeneralStatsBook,
} from "@/core/config/fieldsData/books/cards";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";

type PropsType = {
  el: BookType;
  abs?: boolean;
  border?: boolean;
};

const DataBookDB: FC<PropsType> = ({ el, abs }) => {
  return (
    <>
      <DropStats
        {...{ el: labelDataBook, abs, fields: showGeneralStatsBook(el) }}
      />

      <DropStats
        {...{
          el: labelBookRating,
          abs,
          fields: fieldsStatsRatingBook(el),
        }}
      />
    </>
  );
};

export default DataBookDB;
