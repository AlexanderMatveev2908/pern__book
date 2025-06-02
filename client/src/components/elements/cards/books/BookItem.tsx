import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStats from "../../dropMenus/dropSimple/DropStats";
import {
  fieldsWorkFlowBook,
  labelBookCard,
} from "@/core/config/fieldsData/books/cards";
import InfoBookAbout from "./subComponents/InfoBookAbout";
import {
  labelInfo,
  workFlowLabel,
} from "@/core/config/fieldsData/labels/shared";
import DataBookDB from "./subComponents/DataBookDB";
import InfoStoreFromBook from "./subComponents/InfoStoreFromBook";

type PropsType = {
  el: BookType;
  isOwner?: boolean;
};

const BookItem: FC<PropsType> = ({ el, isOwner }) => {
  return (
    <>
      <DropStats {...{ el: labelBookCard(el.title), border: true }}>
        <InfoBookAbout {...{ el, border: true, abs: true }} />
      </DropStats>

      <DropStats {...{ el: labelInfo, border: true }}>
        <DataBookDB {...{ el, abs: true }} />
      </DropStats>

      <InfoStoreFromBook {...{ el, abs: true, isOwner }} />

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

export default BookItem;
