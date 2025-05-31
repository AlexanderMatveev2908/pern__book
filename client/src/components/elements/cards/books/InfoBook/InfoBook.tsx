import { BookType } from "@/types/all/books";
import type { FC } from "react";
import { workFlowLabel } from "@/core/config/fieldsData/general/labels";
import {
  fieldsWorkFlowBook,
  labelBookCard,
  labelGeneralStatsBook,
} from "@/core/config/fieldsData/cards/books/books";
import InfoStoreFromBook from "./components/InfoStoreFromBook";
import DataBookDB from "./components/DataBookDB";
import InfoBookAbout from "./components/InfoBookAbout";
import DropStatsStatic from "../../shared/Drop/DropStatsStatic";
import DropStats from "../../shared/Drop/DropStats";

type PropsType = {
  el: BookType;
};

const InfoBook: FC<PropsType> = ({ el }) => {
  return (
    <>
      <DropStatsStatic {...{ el: labelBookCard(el.title), border: true }}>
        <InfoBookAbout {...{ el, border: true, abs: true }} />
      </DropStatsStatic>

      <DropStatsStatic {...{ el: labelGeneralStatsBook, border: true }}>
        <DataBookDB {...{ el, abs: true }} />
      </DropStatsStatic>

      <InfoStoreFromBook {...{ el, abs: true }} />

      <DropStats
        {...{
          el: workFlowLabel,
          fields: fieldsWorkFlowBook(el),
          abs: true,
          border: true,
        }}
      />
    </>
  );
};

export default InfoBook;
