import { statsCardStore } from "@/core/config/fieldsData/OwnerLayout/bookStore/card";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import InfoBookStoreWorker from "../../shared/InfoBookStoreWorker";
import DropStats from "../../shared/DropStats";
import {
  labelTeamStore,
  statsTeam,
} from "@/core/config/fieldsData/OwnerLayout/bookStore/actions";
import DropStatsStatic from "../../shared/DropStatsStatic";

type PropsType = {
  el: BookStoreType;
};

const InfoCardStats: FC<PropsType> = ({ el }) => {
  return (
    <DropStatsStatic {...{ el: statsCardStore, border: true }}>
      <InfoBookStoreWorker {...{ abs: true, bookStore: el }} />
      <DropStats
        {...{ abs: true, el: labelTeamStore, fields: statsTeam(el) }}
      />
    </DropStatsStatic>
  );
};

export default InfoCardStats;
