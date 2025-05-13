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

// const getShift = () => 2;

const ImagesSwapper: FC<PropsType> = ({ images = [] }) => {
  const [currSlide, setCurrSlide] = useState<number>(0);
  const [wImg, setWImg] = useState(getSize());
  const clickedRef = useRef<boolean>(false);
  const [items, setItems] = useState<(AssetCloudType | HeroImage)[]>([]);
  // const [shitN, setShitN] = useState(getShift());
  // const replaced = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWImg(getSize());
      // setShitN(Math.min(getShift(), images.length));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [images.length]);

  useEffect(() => {
    setItems(images);
  }, [images]);

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
    setTimeout(() => (clickedRef.current = false), 5000);
  };

  const incSlide = useCallback(() => {
    setCurrSlide((prev) => {
      const next = prev + 1;

      if (next >= items.length) return 0;
      // if (prev % shitN === 0) replaced.current = false;

      return next;
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
      <div className="w-full grid text-[whitesmoke] relative slider">
        <button onClick={decSlide} className={`btn__hero group -left-[20px]`}>
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
