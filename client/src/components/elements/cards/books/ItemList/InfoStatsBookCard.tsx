import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStatsStatic from "../../shared/DropStatsStatic";
import {
  labelBookRating,
  labelGeneralStatsBook,
} from "@/core/config/fieldsData/OwnerLayout/books/read";
import DropStats from "../../shared/DropStats";

type PropsType = {
  el: BookType;
};

const InfoStatsBookCard: FC<PropsType> = ({ el }) => {
  return (
    <DropStatsStatic {...{ el: labelGeneralStatsBook, border: true }}>
      <DropStats {...{ el: labelBookRating, abs: true }} />
    </DropStatsStatic>
  );
};

export default InfoStatsBookCard;
