import DropHandler from "@/components/elements/DropHandler/DropHandler";
import { labelCategoriesBook } from "@/core/config/fieldsData/OwnerLayout/books/read";
import { BookType } from "@/types/all/books";
import { useState, type FC } from "react";
import DropStats from "../../shared/DropStats";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";

type PropsType = {
  el: BookType;
};

const CategoriesParentDrop: FC<PropsType> = ({ el }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  const ids = useCreateIds({
    lengths: [el!.mainCategories!.length, el.categories.length],
  });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <DropHandler
        {...{ isDropOpen, setIsDropOpen, el: labelCategoriesBook }}
      />

      <div
        className={`transition-all duration-[0.4s] ${
          isDropOpen
            ? "opacity-100 max-h-[500px]"
            : "opacity-0 pointer-events-none max-h-0"
        }`}
      >
        <DropStats
          {...{ el: { label: "Main categories" }, fields: null, abs: true }}
        >
          {el.mainCategories?.map((el, i) => (
            <li key={ids![0][i]} className="w-full flex justify-start">
              <span className="txt__2">{el}</span>
            </li>
          ))}
        </DropStats>

        <DropStats
          {...{ el: { label: "Sub categories" }, fields: null, abs: true }}
        >
          {el.categories?.map((el, i) => (
            <li key={ids![1][i]} className="w-full flex justify-start">
              <span className="txt__2">{el}</span>
            </li>
          ))}
        </DropStats>
      </div>
    </div>
  );
};

export default CategoriesParentDrop;
