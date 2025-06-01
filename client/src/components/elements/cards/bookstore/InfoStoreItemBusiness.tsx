import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import {
  fieldsWorkFlowStore,
  labelTeamStore,
  statsCardStore,
  statsTeam,
} from "@/core/config/fieldsData/bookStores/bookStores";
import { workFlowLabel } from "@/core/config/fieldsData/labels";
import InfoStoreMapProp from "./InfoStoreMapProp";
import DropStatsStatic from "../../dropMenus/dropSimple/DropStatsStatic";
import DropStats from "../../dropMenus/dropSimple/DropStats";

type PropsType = {
  el: BookStoreType;
  isOwner?: boolean;
};

const InfoStoreItemBusiness: FC<PropsType> = ({ el, isOwner }) => {
  return (
    <DropStatsStatic {...{ el: statsCardStore, border: true }}>
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
    </DropStatsStatic>
  );
};

export default InfoStoreItemBusiness;
