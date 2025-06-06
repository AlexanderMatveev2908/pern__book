import type { FC } from "react";
import { BookType } from "@/types/all/books";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import TooltipCpy from "@/components/elements/TooltipCpy/TooltipCpy";
import { FaDatabase } from "react-icons/fa";
import { labelStoreBook } from "@/core/config/fieldsData/books/cards";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import { labelCategories } from "@/core/config/fieldsData/labels/shared";

type PropsType = {
  el: BookType;
  isOwner?: boolean;
  listen?: boolean;
};

const InfoStoreFromBook: FC<PropsType> = ({ el, isOwner, listen }) => {
  const ids = useCreateIds({ lengths: [el?.store?.categories?.length] });

  return (
    <DropStats
      {...{
        border: true,
        el: labelStoreBook(el?.store?.name ?? ""),
        ovHidden: false,
        listen,
      }}
    >
      {isOwner && (
        <div className="w-full flex justify-start items-center gap-5 relative">
          <div className="w-full flex justify-start items-center gap-5 ">
            <FaDatabase className="icon__md" />
            <span className="txt__3">Store ID</span>
          </div>

          <TooltipCpy
            {...{ txt: el?.bookStoreID, bd: false, align: "right-0" }}
          />
        </div>
      )}

      <DropStats {...{ el: labelCategories, abs: true, sizeHandler: "sm" }}>
        {el?.store?.categories?.map((el, i) => (
          <li key={ids![0][i]} className="w-full flex justify-start">
            <span className="txt__2">{el}</span>
          </li>
        ))}
      </DropStats>
    </DropStats>
  );
};

export default InfoStoreFromBook;
