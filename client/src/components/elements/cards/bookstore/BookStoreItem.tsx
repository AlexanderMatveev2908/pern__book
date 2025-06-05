import { BookStoreType } from "@/types/all/bookStore";
import type { FC } from "react";
import DropStats from "../../dropMenus/dropSimple/DropStats";
import {
  labelCategories,
  labelInfo,
  libraryLabelStoreDynamic,
  workFlowLabel,
} from "@/core/config/fieldsData/labels/shared";
import InfoStoreObjProp from "./subComponents/InfoStoreObjProp";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import InfoStoreMapProp from "./subComponents/InfoStoreMapProp";
import {
  fieldsWorkFlowStore,
  labelTeamStore,
  statsTeam,
} from "@/core/config/fieldsData/bookStores/cards";

type PropsType = {
  el: BookStoreType;
  isOwner?: boolean;
};

const BookStoreItem: FC<PropsType> = ({ el, isOwner }) => {
  const ids = useCreateIds({ lengths: [el.categories.length] });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <DropStats
        {...{
          el: libraryLabelStoreDynamic(el.name),
          ovHidden: false,
          listen: false,
          border: true,
        }}
      >
        <div className="w-full grid grid-cols-1 gap-4 mt-3">
          <DropStats
            {...{ el: labelCategories, fields: null, abs: true, listen: false }}
          >
            {el?.categories?.map((el, i) => (
              <li
                key={ids?.[0]?.[i] ?? i}
                className="w-full flex justify-start"
              >
                <span className="txt__2">{el}</span>
              </li>
            ))}
          </DropStats>
          <InfoStoreObjProp {...{ bookStore: el, abs: true, listen: false }} />
        </div>
      </DropStats>

      <DropStats
        {...{ el: labelInfo, ovHidden: false, listen: false, border: true }}
      >
        <div className="w-full grid grid-cols-1 gap-4 mt-3">
          <InfoStoreMapProp {...{ abs: true, bookStore: el, listen: false }} />
          {isOwner && (
            <DropStats
              {...{
                abs: true,
                el: labelTeamStore,
                fields: statsTeam(el),
                listen: false,
              }}
            />
          )}

          <DropStats
            {...{
              el: workFlowLabel,
              fields: fieldsWorkFlowStore(el!),
              abs: true,
              listen: false,
            }}
          />
        </div>
      </DropStats>
    </div>
  );
};

export default BookStoreItem;
