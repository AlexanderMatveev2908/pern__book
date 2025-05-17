import { labelCategoriesBook } from "@/core/config/fieldsData/OwnerLayout/books/read";
import { BookType } from "@/types/all/books";
import { type FC } from "react";
import DropStats from "../../shared/DropStats";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import DropStatsStatic from "../../shared/DropStatsStatic";

type PropsType = {
  el: BookType;
};

const CategoriesParentDrop: FC<PropsType> = ({ el }) => {
  const ids = useCreateIds({
    lengths: [el!.mainCategories!.length, el.categories.length],
  });

  return (
    <DropStatsStatic {...{ el: labelCategoriesBook }}>
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
          <li key={ids![0][i]} className="w-full flex justify-start">
            <span className="txt__2">{el}</span>
          </li>
        ))}
      </DropStats>
    </DropStatsStatic>
  );
};

export default CategoriesParentDrop;
