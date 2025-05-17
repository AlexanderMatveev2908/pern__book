import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStatsStatic from "../../shared/DropStatsStatic";
import {
  fieldsStatsRatingBook,
  labelBookRating,
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

      {showGeneralStatsBook(el).map((el) => (
        <div className="w-full flex justify-center items-center gap-5 pb-4">
          <div className="w-full flex items-center gap-5 justify-start">
            <el.icon className="icon__md" />

            <span className="txt__3">{el.label}</span>
          </div>

          <span className="txt__3">{el.val}</span>
        </div>
      ))}
    </DropStatsStatic>
  );
};

export default InfoStatsBookCard;
