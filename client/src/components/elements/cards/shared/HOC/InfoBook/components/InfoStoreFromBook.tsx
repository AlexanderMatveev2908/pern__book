import type { FC } from "react";
import { BookType } from "@/types/all/books";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import DropStats from "../../../Drop/DropStats";
import TooltipCpy from "@/components/elements/TooltipCpy/TooltipCpy";
import { FaDatabase } from "react-icons/fa";
import DropStatsStatic from "../../../Drop/DropStatsStatic";
import {
  labelCategoriesBook,
  labelStoreBook,
} from "@/core/config/fieldsData/cards/books/books";

type PropsType = {
  el: BookType;
};

const InfoStoreFromBook: FC<PropsType> = ({ el }) => {
  const ids = useCreateIds({ lengths: [el?.store?.categories?.length] });

  return (
    <DropStatsStatic
      {...{ border: true, el: labelStoreBook(el?.store?.name ?? "") }}
    >
      <div className="w-full grid grid-cols-[150px_1fr] items-center mb-4">
        <div className="w-full flex justify-start items-center gap-5">
          <FaDatabase className="icon__md" />
          <span className="txt__3">Store ID</span>
        </div>

        <div className="w-full h-full">
          <TooltipCpy
            {...{ txt: el?.bookStoreID, bd: false, align: "right-0" }}
          />
        </div>
      </div>

      <DropStats {...{ el: labelCategoriesBook, abs: true }}>
        {el?.store?.categories?.map((el, i) => (
          <li key={ids![0][i]} className="w-full flex justify-start">
            <span className="txt__2">{el}</span>
          </li>
        ))}
      </DropStats>
    </DropStatsStatic>
  );
};

export default InfoStoreFromBook;
