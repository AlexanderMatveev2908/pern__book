import ImagesItem from "@/components/elements/imagesHandlers/ImagesItem";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import {
  linksBookConsumer,
  showStoreAddressFromBook,
  statsDeliveryStoreFromBook,
} from "@/features/ConsumerLayout/BooksLayout/fields/card";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import {
  labelBookCard,
  labelDataBook,
  showGeneralStatsBook,
} from "@/core/config/fieldsData/books/cards";
import InfoBookAbout from "@/components/elements/cards/books/subComponents/InfoBookAbout";
import {
  labelCategories,
  labelInfo,
  libraryLabelStoreDynamic,
} from "@/core/config/fieldsData/labels/shared";
import RatingFancy from "@/components/elements/cards/shared/rating/RatingFancy";
import {
  labelDelivery,
  labelFieldAddressStore,
} from "@/core/config/fieldsData/bookStores/cards";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";

type PropsType = {
  el: BookType;
};

const BookItemConsumer: FC<PropsType> = ({ el }) => {
  const ids = useCreateIds({ lengths: [el?.store?.categories?.length] });

  return (
    <div className="c_card">
      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-5">
        <div className="w-full grid grid-cols-1 h-fit items-start">
          <ImagesItem {...{ images: el.images }} />
        </div>

        <div
          className={`w-full grid grid-cols-1 gap-4 sm:h-fit sm:items-start ${
            el.images?.length ? "" : "-mt-5"
          }`}
        >
          <DropStats {...{ el: labelBookCard(el.title), border: true }}>
            <InfoBookAbout {...{ el, border: true, abs: true }} />
          </DropStats>

          <DropStats {...{ el: labelInfo, border: true }}>
            <DropStats
              {...{
                el: labelDataBook,
                abs: true,
                fields: showGeneralStatsBook(el),
              }}
            />

            <RatingFancy {...{ el, abs: true }} />
          </DropStats>

          <DropStats
            {...{
              el: libraryLabelStoreDynamic(el?.store?.name ?? ""),
              border: true,
            }}
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
                el: labelCategories,
                abs: true,
              }}
            >
              {el?.store?.categories?.map((el, i) => (
                <li
                  key={ids?.[0]?.[i] ?? i}
                  className="w-full flex justify-start"
                >
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
          </DropStats>
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: linksBookConsumer, invalid: [1] }} />
    </div>
  );
};

export default BookItemConsumer;
