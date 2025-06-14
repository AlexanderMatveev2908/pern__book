import RatingItem from "@/components/elements/cards/shared/rating/RatingItem";
import SpanInfoCard from "@/components/elements/cards/shared/spans/SpanInfoCard";
import { priceFormatter } from "@/core/lib/lib";
import { BookType } from "@/types/all/books";
import type { FC } from "react";
import { FaPenFancy } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

type PropsType = {
  el: BookType;
};

const MainContentBookConsumer: FC<PropsType> = ({ el }) => {
  return (
    <>
      <SpanInfoCard
        {...{
          spanInfo: {
            icon: FaPenFancy,
            label: el.author,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            icon: TbPigMoney,
            label: priceFormatter(el.price),
          },
        }}
      />

      <div className="w-full flex justify-start items-center gap-5">
        <RatingItem {...{ rat: el.ratingStats.avgRating }} />

        <SpanInfoCard {...{ spanInfo: { label: el.ratingStats.avgRating! } }} />

        <div className="w-full flex justify-start -ml-2">
          <span className="txt__2">({el.ratingStats.reviewsCount})</span>
        </div>
      </div>
    </>
  );
};

export default MainContentBookConsumer;
