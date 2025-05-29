import { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ImgLoaderHandler from "../../../components/elements/cards/shared/ImgLoaderHandler/ImgLoaderHandler";
import { BookType } from "@/types/all/books";
import ServerCard from "./components/ServerCard";
import { useSlideImg } from "@/core/hooks/all/useSlideImg";

type PropsType = {
  books?: BookType[];
  children?: (book: BookType, i: number) => React.ReactNode;
};

const ImagesSwapper: FC<PropsType> = ({ books = [], children }) => {
  const { handleClickRef, incSlide, decSlide, currSlide, wImg, numSwap } =
    useSlideImg({ items: books });

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
                  className={`flex rounded-xl transition-all duration-500 ${
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
                      {typeof children === "function" && children(el, i)}
                    </ImgLoaderHandler>

                    <ServerCard {...{ el }} />
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
