import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import InfoBookStoreWorker from "../../shared/HOC/InfoBookStoreWorker";
import DropStats from "../../shared/Drop/DropStats";
import DropStatsStatic from "../../shared/Drop/DropStatsStatic";
import {
  labelTeamStore,
  statsCardStore,
  statsTeam,
} from "@/core/config/fieldsData/cards/bookStores/bookStores";

type PropsType = {
  el: BookStoreType;
  isOwner?: boolean;
};

const InfoCardStatsStore: FC<PropsType> = ({ el, isOwner }) => {
  return (
    <DropStatsStatic {...{ el: statsCardStore, border: true }}>
      <InfoBookStoreWorker {...{ abs: true, bookStore: el }} />
      {isOwner && (
        <DropStats
          {...{ abs: true, el: labelTeamStore, fields: statsTeam(el) }}
        />
      )}
    </DropStatsStatic>
  );
};

export default InfoCardStatsStore;
