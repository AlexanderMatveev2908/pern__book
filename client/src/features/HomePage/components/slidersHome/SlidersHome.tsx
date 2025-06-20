import WrapSectionHome from "@/components/HOC/WrapSectionHome";
import { useEffect, useState, type FC } from "react";
import ImagesSwapper from "./components/ImagesSwapper/ImagesSwapper";
import WrapBg from "./components/WrapBg";
import { clampBy, formatD, isArrOk, priceFormatter } from "@/core/lib/lib";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { BookType } from "@/types/all/books";
import { tailwindBreak } from "@/core/config/breakpoints";
import RatingItem from "@/components/elements/cards/shared/rating/RatingItem";

type PropsType = {
  booksByRating?: BookType[];
  booksRecent?: BookType[];
  booksByPrice?: BookType[];
};

const getHD = () => (window.innerWidth > tailwindBreak.md ? 60 : 50);

const SlidersHome: FC<PropsType> = ({
  booksByRating,
  booksByPrice,
  booksRecent,
}) => {
  const [hDate, setHDate] = useState(getHD());

  useEffect(() => {
    const resize = () => setHDate(getHD());

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const ids = useCreateIds({
    lengths: [booksByRating?.length, booksRecent?.length, booksByPrice?.length],
  });

  return (
    <div className="w-full grid grid-cols-1 gap-16 justify-items-center">
      <WrapSectionHome
        {...{ title: "Best rating", len: booksByRating?.length }}
      >
        {isArrOk(booksByRating) && (
          <ImagesSwapper {...{ books: booksByRating }}>
            {(el, i) => (
              <WrapBg key={ids[0][i]}>
                <RatingItem {...{ rat: el?.ratingStats?.avgRating }} />
              </WrapBg>
            )}
          </ImagesSwapper>
        )}
      </WrapSectionHome>

      <WrapSectionHome {...{ title: "most recent", len: booksRecent?.length }}>
        {isArrOk(booksRecent) && (
          <ImagesSwapper {...{ books: booksRecent }}>
            {(el, i) => (
              <WrapBg key={ids[1][i]} {...{ h: hDate }}>
                <span className="txt__2 text-center clamp_txt" {...clampBy(2)}>
                  {formatD(el?.createdAt)}
                </span>
              </WrapBg>
            )}
          </ImagesSwapper>
        )}
      </WrapSectionHome>

      <WrapSectionHome
        {...{ title: "competitive price", len: booksByPrice?.length }}
      >
        {isArrOk(booksByPrice) && (
          <ImagesSwapper {...{ books: booksByPrice }}>
            {(el, i) => (
              <WrapBg key={ids[2][i]}>
                <span className="txt__3 text-center clamp_txt" {...clampBy(1)}>
                  {priceFormatter(el?.price)}
                </span>
              </WrapBg>
            )}
          </ImagesSwapper>
        )}
      </WrapSectionHome>
    </div>
  );
};

export default SlidersHome;
