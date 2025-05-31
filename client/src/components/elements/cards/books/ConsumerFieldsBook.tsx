import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStatsStatic from "../shared/Drop/DropStatsStatic";
import InfoBookAbout from "./InfoBook/components/InfoBookAbout";
import {
  labelBookCard,
  labelDataBook,
  labelGeneralStatsBook,
  showGeneralStatsBook,
  showStoreAddressFromBook,
} from "@/core/config/fieldsData/cards/books/books";
import DropStats from "../shared/Drop/DropStats";
import RatingFancy from "../shared/RatingFancy";
import { HiLibrary } from "react-icons/hi";
import { labelFieldAddressStore } from "@/core/config/fieldsData/cards/bookStores/bookStores";

type PropsType = {
  el: BookType;
};

export const libraryLabelStore = (label: string) => ({
  label,
  icon: HiLibrary,
});

const ConsumerFieldsBook: FC<PropsType> = ({ el }) => {
  return (
    <>
      <DropStatsStatic {...{ el: labelBookCard(el.title), border: true }}>
        <InfoBookAbout {...{ el, border: true, abs: true }} />
      </DropStatsStatic>

      <DropStatsStatic {...{ el: labelGeneralStatsBook, border: true }}>
        <DropStats
          {...{
            el: labelDataBook,
            abs: true,
            fields: showGeneralStatsBook(el),
          }}
        />

        <RatingFancy {...{ el }} />
      </DropStatsStatic>

      <DropStatsStatic
        {...{ el: libraryLabelStore(el?.store?.name ?? ""), border: true }}
      >
        <DropStats
          {...{
            el: labelFieldAddressStore,
            abs: true,
            fields: showStoreAddressFromBook(el),
          }}
        />
      </DropStatsStatic>
    </>
  );
};

export default ConsumerFieldsBook;
