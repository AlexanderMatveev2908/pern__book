import { BookType } from "@/types/all/books";
import type { FC } from "react";
import InfoBookAbout from "./InfoBook/components/InfoBookAbout";
import {
  labelBookCard,
  labelDataBook,
  labelGeneralStatsBook,
  showGeneralStatsBook,
} from "@/core/config/fieldsData/books/books";
import RatingFancy from "../../rating/RatingFancy";
import { HiLibrary } from "react-icons/hi";
import {
  categoriesStoreLabel,
  labelDelivery,
  labelFieldAddressStore,
} from "@/core/config/fieldsData/bookStores/bookStores";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import {
  showStoreAddressFromBook,
  statsDeliveryStoreFromBook,
} from "@/features/ConsumerLayout/fields/books/card";
import DropStatsStatic from "../../dropMenus/dropSimple/DropStatsStatic";
import DropStats from "../../dropMenus/dropSimple/DropStats";

type PropsType = {
  el: BookType;
};

const libraryLabelStore = (label: string) => ({
  label,
  icon: HiLibrary,
});

const ConsumerFieldsBook: FC<PropsType> = ({ el }) => {
  const ids = useCreateIds({ lengths: [el?.store?.categories?.length] });

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

        <DropStats
          {...{
            el: categoriesStoreLabel,
            abs: true,
          }}
        >
          {el?.store?.categories?.map((el, i) => (
            <li key={ids?.[0]?.[i] ?? i} className="w-full flex justify-start">
              <span className="txt__2">{el}</span>
            </li>
          ))}
        </DropStats>

        <DropStats
          {...{
            el: labelDelivery,
            abs: true,
            fields: statsDeliveryStoreFromBook(el),
          }}
        />
      </DropStatsStatic>
    </>
  );
};

export default ConsumerFieldsBook;
