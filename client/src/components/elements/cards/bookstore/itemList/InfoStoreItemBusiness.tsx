import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import InfoStoreMapProp from "../../shared/HOC/InfoStoreMapProp";
import DropStats from "../../shared/Drop/DropStats";
import DropStatsStatic from "../../shared/Drop/DropStatsStatic";
import {
  fieldsWorkFlowStore,
  labelTeamStore,
  statsCardStore,
  statsTeam,
} from "@/core/config/fieldsData/cards/bookStores/bookStores";
import { workFlowLabel } from "@/core/config/fieldsData/general/labels";

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
