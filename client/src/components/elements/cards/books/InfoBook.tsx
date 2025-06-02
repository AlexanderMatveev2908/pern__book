import { BookType } from "@/types/all/books";
import type { FC } from "react";
import {
  labelInfo,
  workFlowLabel,
} from "@/core/config/fieldsData/labels/shared";
import {
  fieldsWorkFlowBook,
  labelBookCard,
} from "@/core/config/fieldsData/books/cards";
import DropStatsStatic from "@/components/elements/dropMenus/dropSimple/DropStatsStatic";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import InfoBookAbout from "./InfoBookAbout";
import DataBookDB from "./DataBookDB";
import InfoStoreFromBook from "./InfoStoreFromBook";

type PropsType = {
  el: BookType;
};

const InfoBook: FC<PropsType> = ({ el }) => {
  return (
    <>
      <DropStatsStatic {...{ el: labelBookCard(el.title), border: true }}>
        <InfoBookAbout {...{ el, border: true, abs: true }} />
      </DropStatsStatic>

      <DropStatsStatic {...{ el: labelInfo, border: true }}>
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
