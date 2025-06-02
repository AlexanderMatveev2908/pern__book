import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import {
  fieldsWorkFlowStore,
  labelTeamStore,
  statsTeam,
} from "@/core/config/fieldsData/bookStores/cards";
import {
  labelInfo,
  workFlowLabel,
} from "@/core/config/fieldsData/labels/shared";
import InfoStoreMapProp from "./InfoStoreMapProp";
import DropStats from "../../dropMenus/dropSimple/DropStats";

type PropsType = {
  el: BookStoreType;
  isOwner?: boolean;
};

const InfoStoreItemBusiness: FC<PropsType> = ({ el, isOwner }) => {
  return (
    <DropStats {...{ el: labelInfo, ovHidden: false }}>
      <div className="w-full grid grid-cols-1 gap-4 mt-3">
        <InfoStoreMapProp {...{ abs: true, bookStore: el }} />
        {isOwner && (
          <DropStats
            {...{ abs: true, el: labelTeamStore, fields: statsTeam(el) }}
          />
        )}

        <DropStats
          {...{
            el: workFlowLabel,
            fields: fieldsWorkFlowStore(el!),
            abs: true,
          }}
        />
      </div>
    </DropStats>
  );
};

export default InfoStoreItemBusiness;
