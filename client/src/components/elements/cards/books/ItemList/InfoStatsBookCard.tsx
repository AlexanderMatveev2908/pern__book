import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStatsStatic from "../../shared/DropStatsStatic";
import { labelGeneralStatsBook } from "@/core/config/fieldsData/OwnerLayout/books/read";

type PropsType = {
  el: BookType;
};

const InfoStatsBookCard: FC<PropsType> = ({ el }) => {
  return (
    <DropStatsStatic {...{ el: labelGeneralStatsBook, border: true }}>
      a
    </DropStatsStatic>
  );
};

export default InfoStatsBookCard;
