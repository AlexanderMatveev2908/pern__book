import { BookType } from "@/types/all/books";
import type { FC } from "react";
import ItemList from "../shared/ItemList";
import SpanInfoCard from "../shared/SpanInfoCard";
import { FaBook, FaPenFancy } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";

type PropsType = {
  el: BookType;
};

const BookItemList: FC<PropsType> = ({ el }) => {
  return (
    <ItemList {...{ el }}>
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
    </ItemList>
  );
};

export default BookItemList;
