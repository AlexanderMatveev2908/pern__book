import InfoBookAbout from "@/components/elements/cards/books/subComponents/InfoBookAbout";
import RatingFancy from "@/components/elements/cards/shared/rating/RatingFancy";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import {
  labelDescriptionBook,
  showGeneralStatsBook,
} from "@/core/config/fieldsData/books/cards";
import {
  labelDelivery,
  labelFieldAddressStore,
} from "@/core/config/fieldsData/bookStores/cards";
import {
  labelCategories,
  labelInfo,
  libraryLabelStoreDynamic,
} from "@/core/config/fieldsData/labels/shared";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import {
  showStoreAddressFromBook,
  statsDeliveryStoreFromBook,
} from "@/features/ConsumerLayout/BooksLayout/fields/card";
import { BookType } from "@/types/all/books";
import type { FC } from "react";

type PropsType = {
  book: BookType;
};

const ReadContent: FC<PropsType> = ({ book }) => {
  const ids = useCreateIds({
    lengths: [book?.store?.categories?.length],
  });

  return (
    <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
      <InfoBookAbout {...{ el: book!, listen: true, border: true }} />

      <DropStats
        {...{
          el: labelInfo,
          fields: showGeneralStatsBook(book!),
          listen: true,
          border: true,
        }}
      />

      <RatingFancy {...{ el: book!, listen: true, border: true }} />

      <DropStats
        {...{
          el: libraryLabelStoreDynamic(book?.store?.name ?? ""),
          ovHidden: false,
          listen: true,
          border: true,
        }}
      >
        <DropStats
          {...{
            el: labelFieldAddressStore,
            abs: true,
            fields: showStoreAddressFromBook(book!),
            sizeHandler: "sm",
          }}
        />

        <DropStats
          {...{
            el: labelCategories,
            abs: true,
            sizeHandler: "sm",
          }}
        >
          {book?.store?.categories?.map((el, i) => (
            <li key={ids?.[0]?.[i] ?? i} className="w-full flex justify-start">
              <span className="txt__2">{el}</span>
            </li>
          ))}
        </DropStats>

        <DropStats
          {...{
            el: labelDelivery,
            abs: true,
            fields: statsDeliveryStoreFromBook(book!),
            sizeHandler: "sm",
          }}
        />
      </DropStats>

      <DropStats
        {...{
          el: labelDescriptionBook,
          fields: null,
          styleUL: "max-h-[200px] scroll_app scroll_y overflow-y-auto",
          ovHidden: true,
          listen: true,
          border: true,
        }}
      >
        <li className="w-full flex justify-start pr-5">
          <span className="txt__2">{book?.description ?? "N/A"}</span>
        </li>
      </DropStats>
    </div>
  );
};

export default ReadContent;
