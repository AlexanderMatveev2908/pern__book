import DropHandler from "@/components/elements/dropMenus/DropHandler";
import { BookStoreType } from "@/types/all/bookStore";
import { FC, useState } from "react";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { labelCardStore } from "@/core/config/fieldsData/bookStores/cards";
import InfoStoreObjProp from "./InfoStoreObjProp";
import DropStats from "../../dropMenus/dropSimple/DropStats";
import { labelCategories } from "@/core/config/fieldsData/labels/shared";

type PropsType = {
  el: BookStoreType;
};

const InfoStoreAllUsersItem: FC<PropsType> = ({ el }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  const ids = useCreateIds({ lengths: [el.categories.length] });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <DropHandler
        {...{ isDropOpen, setIsDropOpen, el: labelCardStore(el.name) }}
      />
      <hr className="bg-blue-600 border-0 h-[3px] w-full -mt-2" />

      <div
        className={`transition-all duration-[0.4s] ${
          isDropOpen
            ? "opacity-100 max-h-[500px]"
            : "opacity-0 pointer-events-none max-h-0"
        }`}
      >
        <DropStats {...{ el: labelCategories, fields: null, abs: true }}>
          {el?.categories?.map((el, i) => (
            <li key={ids?.[0]?.[i] ?? i} className="w-full flex justify-start">
              <span className="txt__2">{el}</span>
            </li>
          ))}
        </DropStats>

        <InfoStoreObjProp {...{ bookStore: el, abs: true }} />
      </div>
    </div>
  );
};

export default InfoStoreAllUsersItem;
