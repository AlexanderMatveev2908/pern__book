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
  listen?: boolean;
};

const DataBookDB: FC<PropsType> = ({ el, abs, listen, border }) => {
  return (
    <>
      <DropStats
        {...{
          el: labelDataBook,
          abs,
          fields: showGeneralStatsBook(el),
          listen,
          border,
        }}
      />

      <DropStats
        {...{
          el: labelBookRating,
          abs,
          fields: fieldsStatsRatingBook(el),
          listen,
          border,
        }}
      />
    </>
  );
};

export default DataBookDB;
