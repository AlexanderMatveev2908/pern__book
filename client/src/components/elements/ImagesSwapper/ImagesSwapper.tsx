import { tailwindBreak } from "@/core/config/breakpoints";
import { AssetCloudType } from "@/types/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ImagesSwapper.css";

type HeroImage = {
  id: string;
  src: string;
};

type PropsType = {
  images?: AssetCloudType[] | HeroImage[];
};

const getSize = () =>
  window.innerWidth >= tailwindBreak.lg
    ? 350
    : window.innerWidth >= tailwindBreak.md
    ? 300
    : 200;

const ImagesSwapper: FC<PropsType> = ({ images = [] }) => {
  const [currSlide, setCurrSlide] = useState<number>(0);
  const [wImg, setWImg] = useState(getSize());
  const clickedRef = useRef<boolean>(false);
  const [items, setItems] = useState<(AssetCloudType | HeroImage)[]>([]);
  // const replaced = useRef<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setWImg(getSize());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setItems(images);
  }, [images]);

  // const swapItems = useCallback(() => {
  //   const newItems = cpyObj(items);
  //   const movedItems = [...newItems, ...newItems.slice(0, 3)];
  //   setItems(movedItems);
  // }, [items]);

  // useEffect(() => {
  //   if (currSlide && currSlide % 3 === 0 && !replaced.current) {
  //     replaced.current = true;
  //     swapItems();
  //   }
  // }, [swapItems, currSlide]);

  const handleClickRef = () => {
    clickedRef.current = true;
    setTimeout(() => (clickedRef.current = false), 5000);
  };

  const incSlide = useCallback(() => {
    setCurrSlide((prev) => {
      if (prev === items.length - 1) {
        return 0;
      } else {
        // if ((prev + 1) % 3 === 0) replaced.current = false;
        return prev + 1;
      }
    });
  }, [items.length]);

  const decSlide = () => {
    handleClickRef();
    setCurrSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!clickedRef.current) incSlide();
    }, 1250);

    return () => clearInterval(interval);
  }, [incSlide]);

  return !items?.length ? null : (
    <div className="w-full flex justify-center">
      <div
        className="w-full grid text-[whitesmoke] relative"
        style={{
          width: `${wImg + 40}px`,
        }}
      >
        <button onClick={decSlide} className={`btn__hero group -left-[20px]`}>
          <FaChevronLeft className="icon__md icon__with_txt" />
        </button>

        <div className="w-full flex overflow-hidden p-5 el__border_md">
          <div
            className="flex transition-all duration-500 gap-[40px] w-fit"
            style={{
              transform: `translateX(-${currSlide * (wImg + 40)}px)`,
            }}
          >
            <>
              {items.map((el, i) => (
                <div
                  key={el.id}
                  className="rounded-xl overflow-hidden"
                  style={{ width: wImg, height: wImg }}
                >
                  <img
                    src={(el as AssetCloudType)?.url ?? (el as HeroImage).src}
                    alt={`img__${i}`}
                    className="w-full h-full object-cover"
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
          className={`btn__hero -right-[20px] group`}
        >
          <FaChevronRight className="icon__md icon__with_txt" />
        </button>
      </div>
    </div>
  );
};

export default ImagesSwapper;
