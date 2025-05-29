import { tailwindBreak } from "@/core/config/breakpoints";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ImgLoaderHandler from "../../../components/elements/cards/shared/ImgLoaderHandler/ImgLoaderHandler";
import { BookType } from "@/types/all/books";
import RatingItem from "../../../components/elements/RatingItem";
import { priceFormatter } from "@/core/lib/lib";
import { IoNavigateOutline } from "react-icons/io5";

type PropsType = {
  books?: BookType[];
};

const SpanTxt = ({
  txt,
  fsz,
  clamp,
}: {
  fsz: string;
  txt: string;
  clamp: number;
}) => (
  <div className="w-full flex-1 justify-center items-start max-h-fit">
    <span
      className={`${fsz} clamp_txt text-center`}
      style={{ lineClamp: clamp, WebkitLineClamp: clamp }}
    >
      {txt}
    </span>
  </div>
);

const obj = {
  size: () => (window.innerWidth >= tailwindBreak.md ? 300 : 200),
  num: () =>
    window.innerWidth >= 1500
      ? 4
      : window.innerWidth >= 1200
      ? 3
      : window.innerWidth >= 540
      ? 2
      : 1,
};

const ImagesSwapper: FC<PropsType> = ({ books = [] }) => {
  const [currSlide, setCurrSlide] = useState<number>(0);
  const [wImg, setWImg] = useState(obj.size());
  const [numSwap, setNumSwap] = useState(obj.num());
  const clickedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWImg(obj.size());
      setNumSwap(obj.num());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [books.length]);

  const handleClickRef = () => {
    clickedRef.current = true;
    setTimeout(() => (clickedRef.current = false), 5000);
  };

  const incSlide = useCallback(() => {
    setCurrSlide((prev) => {
      const maxStart = books.length - numSwap;
      const next = prev + numSwap;

      if (next >= maxStart) return 0;

      return next;
    });
  }, [books, numSwap]);

  const decSlide = () => {
    setCurrSlide((prev) => {
      const nextPrev = prev - numSwap;
      return nextPrev < 0 ? books.length - 1 - numSwap : nextPrev;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!clickedRef.current) incSlide();
    }, 1500);

    return () => clearInterval(interval);
  }, [incSlide]);

  return !books?.length ? null : (
    <div className="w-full flex justify-center images_swapper">
      <div className="grid grid-cols-1 text-[whitesmoke] relative">
        <button
          onClick={() => {
            handleClickRef();
            decSlide();
          }}
          className={`btn group -left-[30px]`}
        >
          <FaChevronLeft className="icon__md icon__with_txt" />
        </button>

        <div className="cont w-full flex overflow-hidden p-[20px] el__border_md">
          <div
            className="flex wrapper transition-all duration-500 gap-[40px] w-fit h-fit items-start"
            style={{
              transform: `translateX(-${currSlide * (wImg + 40)}px)`,
            }}
          >
            <>
              {books.map((el, i) => (
                <div
                  key={books[i].id}
                  className={`flex rounded-xl transition-all duration-500${
                    i >= currSlide && i < currSlide + numSwap
                      ? ""
                      : "opacity-0 pointer-events-none"
                  }`}
                  style={{ width: wImg, height: wImg }}
                >
                  <div className="min-w-full min-h-full rounded-xl card border-2 border-neutral-800 ">
                    <ImgLoaderHandler
                      {...{
                        url: books![i]!.images![0].url || "",
                        customClass: "client",
                      }}
                    >
                      <div className="w-full absolute bottom-0 bg-black/90 h-[40px] rounded-xl">
                        <div className="w-full flex h-full items-center">
                          <RatingItem {...{ rat: el?.avgRating }} />
                        </div>
                      </div>
                    </ImgLoaderHandler>

                    <div className="server flex flex-col items-center justify-start p-3 gap-2 md:gap-5 max-h-full">
                      <SpanTxt
                        {...{ txt: el.author, fsz: "txt__4", clamp: 1 }}
                      />
                      <SpanTxt
                        {...{ txt: el.title, fsz: "txt__3", clamp: 2 }}
                      />
                      {/* <div className="w-full flex-1 mt-3 overflow-y-auto scroll_app scroll_y pr-3">
                        <span className="txt__2 max-h-full overflow-hidden">
                          {el.description}
                        </span>
                      </div> */}
                      <SpanTxt
                        {...{
                          txt: priceFormatter(el.price),
                          fsz: "txt__4",
                          clamp: 5,
                        }}
                      />

                      <IoNavigateOutline className="md:mt-5 min-w-[40px] md:min-w-[60px] min-h-[40px] md:min-h-[60px]" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>

        <button
          onClick={() => {
            handleClickRef();
            incSlide();
          }}
          className={`btn -right-[30px] group`}
        >
          <FaChevronRight className="icon__md icon__with_txt" />
        </button>
      </div>
    </div>
  );
};

export default ImagesSwapper;
