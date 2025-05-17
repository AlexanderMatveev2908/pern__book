import DropHandler from "@/components/elements/DropHandler/DropHandler";
import {
  labelBookCard,
  labelBookInfo,
  statsBookInfo,
} from "@/core/config/fieldsData/OwnerLayout/books/read";
import { BookType } from "@/types/all/books";
import { useState, type FC } from "react";
import CategoriesParentDrop from "./CategoriesParentDrop";
import DropStats from "../../shared/DropStats";

type PropsType = {
  el: BookType;
};

const InfoBookCard: FC<PropsType> = ({ el }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return !el ? null : (
    <div className="w-full grid grid-cols-1 gap-4">
      <DropHandler
        {...{ isDropOpen, setIsDropOpen, el: labelBookCard(el.title) }}
      />
      <hr className="bg-blue-600 border-0 h-[3px] w-full -mt-2" />

      <div
        className={`transition-all duration-[0.4s] ${
          isDropOpen
            ? "opacity-100 max-h-[500px]"
            : "opacity-0 pointer-events-none max-h-0"
        }`}
      >
        <CategoriesParentDrop {...{ el }} />

        <DropStats
          {...{ el: labelBookInfo, fields: statsBookInfo(el), abs: true }}
        />
      </div>
    </div>
  );
};

export default InfoBookCard;
