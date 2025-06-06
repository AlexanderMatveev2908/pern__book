import { linksBookConsumer } from "@/features/ConsumerLayout/BooksLayout/fields/card";
import { BookType } from "@/types/all/books";
import { useMemo, type FC } from "react";
import { labelBookTitle } from "@/core/config/fieldsData/labels/shared";
import SpanTitleCard from "@/components/elements/cards/shared/SpanTitleCard";
import SpanInfoCard from "@/components/elements/cards/shared/SpanInfoCard";
import { TbPigMoney } from "react-icons/tb";
import { isArrOk, priceFormatter } from "@/core/lib/lib";
import RatingItem from "@/components/elements/cards/shared/rating/RatingItem";
import { FaPenFancy } from "react-icons/fa";
import ButtonsCart from "@/features/ConsumerLayout/CartLayout/components/ButtonsCart";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import ImagesItem from "@/components/elements/imagesHandlers/ImagesItem/ImagesItem";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";

type PropsType = {
  el: BookType;
};

const BookItemConsumer: FC<PropsType> = ({ el }) => {
  const { cart } = useGetCart();

  const hasImages = useMemo(() => isArrOk(el.images), [el]);

  return (
    <div className="border-[3px] border-neutral-800 rounded-xl p-4 pb-5 gap-6 grid grid-cols-1">
      <div className="w-full grid grid-cols-1 gap-x-10 gap-y-6 item">
        <div className="w-full col-span-2">
          <SpanTitleCard {...{ label: labelBookTitle(el.title) }} />
        </div>

        <div className="w-full h-fit grid grid-cols-1 gap-y-5 gap-x-10">
          {hasImages && (
            <div className="w-full grid grid-cols-1 h-fit items-start">
              <ImagesItem {...{ images: el.images }} />
            </div>
          )}

          <div
            className={`w-full grid grid-cols-1 gap-y-3 h-fit ${
              !hasImages ? "col-span-2" : ""
            }`}
          >
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
                spanInfo: { icon: TbPigMoney, label: priceFormatter(el.price) },
              }}
            />
            <div className="w-full flex justify-start items-center gap-5">
              <RatingItem {...{ rat: el.ratingStats.avgRating }} />

              <SpanInfoCard
                {...{ spanInfo: { label: el.ratingStats.avgRating! } }}
              />

              <div className="w-full flex justify-start -ml-2">
                <span className="txt__2">({el.ratingStats.reviewsCount})</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 h-fit items-center justify-items-center">
              <PairBtnsLink
                {...{ ID: el.id, links: linksBookConsumer(el.id) }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center ">
        <ButtonsCart {...{ book: el, cart }} />
      </div>
    </div>
  );
};

export default BookItemConsumer;
