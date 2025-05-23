import {
  labelBookCard,
  labelBookInfo,
  labelCategoriesBook,
  statsBookInfo,
} from "@/core/config/fieldsData/OwnerLayout/books/read";
import { BookType } from "@/types/all/books";
import { type FC } from "react";
import DropStats from "../../shared/Drop/DropStats";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import DropStatsStatic from "../../shared/Drop/DropStatsStatic";

type PropsType = {
  el: BookType;
};

const InfoBookCard: FC<PropsType> = ({ el }) => {
  const ids = useCreateIds({
    lengths: [el?.categories?.length],
  });

  return !el ? null : (
    <DropStatsStatic {...{ el: labelBookCard(el.title), border: true }}>
      <DropStats {...{ el: labelCategoriesBook, fields: null, abs: true }}>
        {el.categories?.map((el, i) => (
          <li key={ids![0][i]} className="w-full flex justify-start">
            <span className="txt__2">{el}</span>
          </li>
        ))}
      </DropStats>

      <DropStats
        {...{ el: labelBookInfo, fields: statsBookInfo(el), abs: true }}
      />
    </DropStatsStatic>
  );
};

export default InfoBookCard;
