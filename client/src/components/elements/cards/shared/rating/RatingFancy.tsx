import { BookType } from "@/types/all/books";
import type { FC } from "react";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { replacePoint } from "@/core/lib/lib";
import { labelBookRating } from "@/core/config/fieldsData/books/cards";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";

type PropsType = {
  el: BookType;
  abs?: boolean;
  listen?: boolean;
};

type StrRat = "full" | "half" | "none";

const objEnumLike = {
  full: FaStar,
  half: FaStarHalfAlt,
  none: FaRegStar,
};

const ShowRat = ({ str }: { str: StrRat }) => {
  const Icon = objEnumLike[str];

  return <Icon className="icon__sm" />;
};

const calcRat = (val: number, i: number) =>
  val >= i + 1 ? "full" : val >= i + 0.5 ? "half" : "none";

const arrKeys = () => {
  const arr = [
    [0, 1],
    [1.1, 2],
    [2.1, 3],
    [3.1, 4],
    [4.1, 5],
  ];

  return arr.map((el) => ({
    field: `reviews__${replacePoint(el[0])}__${replacePoint(el[1])}`,
    valsStr: Array.from({ length: 5 }, (_, innerIndex) => {
      return calcRat(el[1], innerIndex);
    }),
  }));
};

const RatingFancy: FC<PropsType> = ({ el, abs, listen }) => {
  // ? FIRST 2 UTILS TO AVOID WRITE TTO MUCH,
  // ? STARS AVG RATING
  // ? NUMBERS OF COUNTERS OF RATINGS FROM 1 TO 5
  // ? COUNTERS FOR EACH STAR => 5 * 5
  const ids = useCreateIds({
    lengths: [2, 5, 5, ...Array.from({ length: 5 }, () => 5)],
  });

  return (
    <DropStats {...{ abs, el: labelBookRating, fields: null, listen }}>
      <div className="w-full flex justify-between items-center">
        {ids[0].map((id, i) => (
          <div
            key={id}
            className={`w-full flex ${!i ? "justify-start" : "justify-end"}`}
          >
            <span className="txt__2">
              {!i ? "Reviews count" : el?.ratingStats?.reviewsCount}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full flex items-center">
        <div className="flex w-full justify-start">
          <span className="txt__2">Avg rating</span>
        </div>

        <div className="w-full flex gap-1 justify-end items-center ">
          {ids[1].map((id, i) => {
            const { ratingStats: { avgRating } = {} } = el;
            const avg = +(avgRating ?? 0);

            return (
              <ShowRat
                key={id}
                {...{
                  str: calcRat(avg, i) as StrRat,
                }}
              />
            );
          })}
        </div>
      </div>

      {arrKeys().map((objDynamic, outerIndex) => (
        <div key={ids[2][outerIndex]} className="w-full flex items-center">
          <div className="w-full flex justify-start items-center gap-1">
            {objDynamic.valsStr.map((str, innerIndex) => (
              <ShowRat key={ids[3 + outerIndex][innerIndex]} {...{ str }} />
            ))}
          </div>

          <div className="w-full flex justify-end">
            <span className="txt__2">
              {
                el?.ratingStats?.[
                  objDynamic.field as keyof BookType["ratingStats"]
                ]
              }
            </span>
          </div>
        </div>
      ))}
    </DropStats>
  );
};

export default RatingFancy;
