import { tailwindBreak } from "@/core/config/breakpoints";
import { AssetCloudType } from "@/types/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ImgLoaderHandler from "../cards/shared/ImgLoaderHandler/ImgLoaderHandler";

type HeroImage = {
  id: string;
  src: string;
};

type PropsType = {
  images?: AssetCloudType[] | HeroImage[];
};

const getSize = () => (window.innerWidth >= tailwindBreak.md ? 300 : 200);

const getSwapNum = () =>
  window.innerWidth >= 1500
    ? 4
    : window.innerWidth >= 1200
    ? 3
    : window.innerWidth >= 550
    ? 2
    : 1;

const ImagesSwapper: FC<PropsType> = ({ images = [] }) => {
  const [currSlide, setCurrSlide] = useState<number>(0);
  const [wImg, setWImg] = useState(getSize());
  const clickedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWImg(getSize());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [images.length]);

  // const swapItems = useCallback(async () => {
  //   const newItems = cpyObj(items);
  //   const movedItems = [...newItems.slice(shitN), ...newItems.slice(0, shitN)];

  //   setCurrSlide(0);
  //   setItems(movedItems);
  // }, [items, shitN]);

  // useEffect(() => {
  //   if (currSlide % shitN === 0 && !replaced.current) {
  //     replaced.current = true;
  //     swapItems();
  //   }
  // }, [swapItems, currSlide, shitN, images.length]);

  const handleClickRef = () => {
    clickedRef.current = true;
    setTimeout(() => (clickedRef.current = false), 10000);
  };

  const incSlide = useCallback(() => {
    setCurrSlide((prev) => {
      const maxStart = images.length - getSwapNum();
      const next = prev + getSwapNum();

      if (next >= maxStart) return 0;

      return next;
    });
  }, [images]);

  const decSlide = () => {
    setCurrSlide((prev) => {
      const nextPrev = prev - getSwapNum();
      return nextPrev < 0 ? images.length - 1 - getSwapNum() : nextPrev;
    });
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!clickedRef.current) incSlide();
  //   }, 1250);

  //   return () => clearInterval(interval);
  // }, [incSlide]);

  return !images?.length ? null : (
    <div className="w-full flex justify-center images_swapper">
      <div className="cont grid text-[whitesmoke] relative">
        <button
          onClick={() => {
            handleClickRef();
            decSlide();
          }}
          className={`btn group -left-[20px]`}
        >
          <FaChevronLeft className="icon__md icon__with_txt" />
        </button>

        <div className="w-full flex overflow-hidden p-5 el__border_md">
          <div
            className="flex transition-all duration-500 gap-[40px] w-fit h-fit items-start"
            style={{
              transform: `translateX(-${currSlide * (wImg + 40)}px)`,
            }}
          >
            <>
              {images.map((el, i) => (
                <div
                  key={(el as AssetCloudType).publicID}
                  className={`card rounded-xl transition-all duration-500 border-2 overflow-hidden ${
                    i >= currSlide && i < currSlide + getSwapNum()
                      ? ""
                      : "opacity-0"
                  }`}
                  style={{ width: wImg, height: wImg }}
                >
                  <ImgLoaderHandler
                    {...{
                      url:
                        (el as AssetCloudType)?.url ?? (el as HeroImage)?.src,
                    }}
                  />
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
          className={`btn -right-[20px] group`}
        >
          <FaChevronRight className="icon__md icon__with_txt" />
        </button>
      </div>
    </div>
  );
};

export default ImagesSwapper;
