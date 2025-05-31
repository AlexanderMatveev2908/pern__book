import { BookType } from "@/types/all/books";
import { type FC } from "react";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import {
  labelBookInfo,
  labelCategoriesBook,
  statsBookInfo,
} from "@/core/config/fieldsData/common/cards/books/books";
import DropStats from "../../../shared/Drop/DropStats";

type PropsType = {
  el: BookType;
  abs?: boolean;
};

const InfoBookAbout: FC<PropsType> = ({ el, abs }) => {
  const ids = useCreateIds({
    lengths: [el?.categories?.length],
  });

  return !el ? null : (
    <>
      <DropStats {...{ el: labelCategoriesBook, fields: null, abs }}>
        {el.categories?.map((el, i) => (
          <li key={ids![0][i]} className="w-full flex justify-start">
            <span className="txt__2">{el}</span>
          </li>
        ))}
      </DropStats>

      <DropStats {...{ el: labelBookInfo, fields: statsBookInfo(el), abs }} />
    </>
  );
};

export default InfoBookAbout;
