import { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BookType } from "@/types/all/books";
import { useSlideImg } from "@/core/hooks/all/UI/useSlideImg";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import ImgLoaderHandler from "@/components/elements/imagesHandlers/ImgLoaderHandler/ImgLoaderHandler";
import ServerCard from "./components/ServerCard";
import { Link } from "react-router-dom";
import s from "./ImagesSwapper.module.css";

type PropsType = {
  books?: BookType[];
  children?: (book: BookType, i: number) => React.ReactNode;
};

const ImagesSwapper: FC<PropsType> = ({ books = [], children }) => {
  const {
    handleClickRef,
    incSlide,
    decSlide,
    currSlide,
    wImg,
    arrParent,
    imgsForSwap,
    numBlocks,
    stopSlide,
    startSlide,
  } = useSlideImg({ items: books });

  const ids = useCreateIds({
    lengths: [numBlocks, numBlocks * imgsForSwap],
  });

  return !books?.length ? null : (
    <div className="flex justify-center ">
      <div className="grid grid-cols-1 text-[whitesmoke] relative">
        <button
          onClick={() => {
            handleClickRef();
            decSlide();
          }}
          className={`${s.btn} group -left-[30px]`}
        >
          <FaChevronLeft className="icon__md icon__with_txt" />
        </button>

        <div
          className="flex overflow-hidden p-[20px] el__border_md"
          style={{
            width: `${imgsForSwap * wImg + (imgsForSwap - 1) * 40}px`,
          }}
        >
          <div
            className={`${s.wrapper} flex w-full max-w-full transition-all duration-500 items-start`}
            style={{
              width: `${numBlocks * 100}%`,
              transform: `translateX(-${currSlide * 100}%)`,
            }}
          >
            {arrParent.map((arg, iOuter) => (
              <div
                className={`flex min-w-full gap-[40px] transition-all duration-500 ${
                  iOuter === currSlide ? "" : "opacity-0 pointer-events-none"
                }`}
                key={ids[0][iOuter]}
              >
                {arg.items.map((el, iInner) => (
                  <Link
                    to={`/consumer/books/${el.id}`}
                    onMouseEnter={stopSlide}
                    onMouseLeave={startSlide}
                    key={ids[1][iInner]}
                    className={`flex rounded-xl transition-all duration-500 ${""}`}
                    style={{ width: wImg, height: wImg }}
                  >
                    <div
                      className={`${s.card} min-w-full min-h-full rounded-xl border-2 border-neutral-800 `}
                    >
                      <ImgLoaderHandler
                        {...{
                          url: el.images[0].url || "",
                          customClass: s.client,
                        }}
                      >
                        {typeof children === "function" && children(el, iInner)}
                      </ImgLoaderHandler>

                      <ServerCard {...{ el }} />
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            handleClickRef();
            incSlide();
          }}
          className={`${s.btn} -right-[30px] group`}
        >
          <FaChevronRight className="icon__md icon__with_txt" />
        </button>
      </div>
    </div>
  );
};

export default ImagesSwapper;
