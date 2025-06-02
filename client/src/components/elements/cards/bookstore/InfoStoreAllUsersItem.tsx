import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import InfoStoreObjProp from "./InfoStoreObjProp";
import DropStats from "../../dropMenus/dropSimple/DropStats";
import {
  labelCategories,
  libraryLabelStoreDynamic,
} from "@/core/config/fieldsData/labels/shared";

type PropsType = {
  el: BookStoreType;
};

const InfoStoreAllUsersItem: FC<PropsType> = ({ el }) => {
  const ids = useCreateIds({ lengths: [el.categories.length] });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <DropStats
        {...{
          el: libraryLabelStoreDynamic(el.name),
          ovHidden: false,
        }}
      >
        <DropStats {...{ el: labelCategories, fields: null, abs: true }}>
          {el?.categories?.map((el, i) => (
            <li key={ids?.[0]?.[i] ?? i} className="w-full flex justify-start">
              <span className="txt__2">{el}</span>
            </li>
          ))}
        </DropStats>

        <InfoStoreObjProp {...{ bookStore: el, abs: true }} />
      </DropStats>
    </div>
  );
};

export default InfoStoreAllUsersItem;
