import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStats from "../Drop/DropStats";
import { workFlowLabel } from "@/core/config/fieldsData/general/labels";
import { fieldsWorkFlowBook } from "@/core/config/fieldsData/cards/books/books";
import InfoStoreFromBook from "../../books/ItemList/InfoStoreFromBook";
import DataBookDB from "../../books/ItemList/DataBookDB";
import InfoBookAbout from "../../books/ItemList/InfoBookAbout";

type PropsType = {
  el: BookType;
};

const InfoBook: FC<PropsType> = ({ el }) => {
  return (
    <>
      <InfoBookAbout {...{ el }} />
      <DataBookDB {...{ el }} />
      <InfoStoreFromBook {...{ el }} />
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
