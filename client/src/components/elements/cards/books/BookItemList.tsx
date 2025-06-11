import { BookType } from "@/types/all/books";
import type { FC } from "react";
import ItemList from "../shared/ItemList";
import SpanInfoCard from "../shared/SpanInfoCard";
import { FaBook, FaDatabase, FaPenFancy } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";
import { TbPigMoney } from "react-icons/tb";
import { priceFormatter } from "@/core/lib/lib";

type PropsType = {
  el: BookType;
};

const BookItemList: FC<PropsType> = ({ el }) => {
  return (
    <ItemList {...{ images: el?.images }}>
      <SpanInfoCard
        {...{
          spanInfo: {
            label: el.store?.name,
            icon: HiLibrary,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: el.title,
            icon: FaBook,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: el.author,
            icon: FaPenFancy,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: el.qty,
            icon: FaDatabase,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: priceFormatter(el.price),
            icon: TbPigMoney,
          },
        }}
      />
    </ItemList>
  );
};

export default BookItemList;
