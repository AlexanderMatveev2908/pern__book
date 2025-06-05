import ImagesItem from "@/components/elements/imagesHandlers/ImagesItem";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import { linksBookConsumer } from "@/features/ConsumerLayout/BooksLayout/fields/card";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import { labelBookTitle } from "@/core/config/fieldsData/labels/shared";
import SpanTitleCard from "@/components/elements/cards/shared/SpanTitleCard";
import SpanInfoCard from "@/components/elements/cards/shared/SpanInfoCard";
import { TbPigMoney } from "react-icons/tb";
import { priceFormatter } from "@/core/lib/lib";
import RatingItem from "@/components/elements/cards/shared/rating/RatingItem";
import { FaPenFancy } from "react-icons/fa";
import ButtonsCart from "@/features/ConsumerLayout/CartLayout/components/ButtonsCart";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";

type PropsType = {
  el: BookType;
};

const BookItemConsumer: FC<PropsType> = ({ el }) => {
  const { cart } = useGetCart();

  return (
    <div className="card_list">
      <div className="w-full">
        <SpanTitleCard {...{ label: labelBookTitle(el.title) }} />
      </div>

      <div className="w-full grid grid-cols-1 h-fit items-start gap-y-5">
        <ImagesItem {...{ images: el.images }} />
      </div>

      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-5 h-fit">
        <div
          className={`w-full grid grid-cols-1 gap-4 sm:h-fit sm:items-start ${
            el.images?.length ? "" : "-mt-5"
          }`}
        >
          <SpanInfoCard
            {...{
              spanInfo: {
                icon: FaPenFancy,
                info: el.author,
              },
            }}
          />

          <SpanInfoCard
            {...{
              spanInfo: { icon: TbPigMoney, info: priceFormatter(el.price) },
            }}
          />
          <div className="w-full flex justify-start items-center gap-5">
            <RatingItem {...{ rat: el.ratingStats.avgRating }} />

            <SpanInfoCard
              {...{ spanInfo: { info: el.ratingStats.avgRating! } }}
            />

            <div className="w-full flex justify-start -ml-2">
              <span className="txt__2">({el.ratingStats.reviewsCount})</span>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 h-fit gap-y-5 footer">
          <div className="w-full flex justify-center">
            <ButtonsCart {...{ book: el, cart }} />
          </div>

          <LinksCard {...{ ID: el.id, links: linksBookConsumer }} />
        </div>
      </div>
    </div>
  );
};

export default BookItemConsumer;
