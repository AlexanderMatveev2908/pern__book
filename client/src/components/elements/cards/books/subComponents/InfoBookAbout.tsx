import { BookType } from "@/types/all/books";
import { type FC } from "react";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import {
  labelBookInfo,
  statsBookInfo,
} from "@/core/config/fieldsData/books/cards";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import { labelCategories } from "@/core/config/fieldsData/labels/shared";

type PropsType = {
  el: BookType;
  abs?: boolean;
  listen?: boolean;
  border?: boolean;
};

const InfoBookAbout: FC<PropsType> = ({ el, abs, listen, border }) => {
  const ids = useCreateIds({
    lengths: [el?.categories?.length],
  });

  return !el ? null : (
    <>
      <DropStats
        {...{ el: labelCategories, fields: null, abs, listen, border }}
      >
        {el.categories?.map((el, i) => (
          <li key={ids![0][i]} className="w-full flex justify-start">
            <span className="txt__2">{el}</span>
          </li>
        ))}
      </DropStats>

      <DropStats
        {...{
          el: labelBookInfo,
          fields: statsBookInfo(el),
          abs,
          listen,
          border,
        }}
      />
    </>
  );
};

export default InfoBookAbout;
