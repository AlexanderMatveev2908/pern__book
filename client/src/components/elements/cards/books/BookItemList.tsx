import { BookType } from "@/types/all/books";
import type { FC } from "react";
import ItemList from "../shared/ItemList";
import SpanInfoCard from "../shared/SpanInfoCard";
import { FaBook, FaPenFancy } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";
import PairBtnsLink from "../shared/PairBtnsLink";
import { BtnIconLinkType } from "@/types/types";

type PropsType = {
  el: BookType;
  links: BtnIconLinkType[];
};

const BookItemList: FC<PropsType> = ({ el, links }) => {
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

      <PairBtnsLink {...{ links }} />
    </ItemList>
  );
};

export default BookItemList;
