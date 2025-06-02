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
      <DropStats
        {...{ el: labelBookCard(el.title), border: true, ovHidden: false }}
      >
        <InfoBookAbout {...{ el, border: true, abs: true }} />
      </DropStats>

      <DropStats {...{ el: labelInfo, border: true, ovHidden: false }}>
        <DataBookDB {...{ el, abs: true }} />
      </DropStats>

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
