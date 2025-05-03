import { tailwindBreak } from "@/core/config/breakpoints";
import { AssetCloudType } from "@/types/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ImagesSwapper.css";
import { isObjOk } from "@/core/lib/lib";

type HeroImage = {
  id: string;
  src: string;
};

type PropsType = {
  images?: AssetCloudType[] | HeroImage[];
  video?: AssetCloudType;
};

const getSize = () =>
  window.innerWidth >= tailwindBreak.lg
    ? 350
    : window.innerWidth >= tailwindBreak.md
    ? 300
    : 200;

const getTotLen = (len: number = 0, video: boolean = false) =>
  video
    ? window.innerWidth > tailwindBreak.xl
      ? len - 1
      : window.innerWidth > tailwindBreak.sm
      ? len + 1
      : len + 2
    : window.innerWidth > tailwindBreak.xl
    ? len - 2
    : window.innerWidth > tailwindBreak.sm
    ? len - 1
    : len;
const ImagesSwapper: FC<PropsType> = ({ images, video }) => {
  const [currSlide, setCurrSlide] = useState<number>(0);
  const [wImg, setWImg] = useState(getSize());
  const [totLen, setTotLen] = useState(
    getTotLen(images?.length, isObjOk(video))
  );
  const clickedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWImg(getSize());
      setTotLen(getTotLen(images?.length, isObjOk(video)));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [images, video]);

  const handleClickRef = () => {
    clickedRef.current = true;
    setTimeout(() => (clickedRef.current = false), 5000);
  };
  const incSlide = useCallback(
    () => setCurrSlide((prev) => (prev === totLen - 1 ? 0 : prev + 1)),
    [totLen]
  );
  const decSlide = () => {
    handleClickRef();
    setCurrSlide((prev) => (prev === 0 ? totLen - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!clickedRef.current) incSlide();
    }, 1250);

    return () => clearInterval(interval);
  }, [incSlide]);

  return !images?.length ? null : (
    <div className="w-full flex">
      <div className="w-full grid text-[whitesmoke] relative">
        <button onClick={decSlide} className={`btn__hero group -left-[20px]`}>
          <FaChevronLeft className="icon__md icon__with_txt" />
        </button>

        <div className="w-full flex gap-[25px] overflow-hidden p-5 el__border_md">
          <div
            className="flex gap-[25px] transition-all duration-500"
            style={{
              transform: `translateX(-${currSlide * (wImg + 25)}px)`,
            }}
          >
            <>
              {isObjOk(video) && (
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ width: (wImg / 9) * 16, height: wImg }}
                >
                  <video
                    src={(video as AssetCloudType)?.url}
                    muted
                    autoPlay
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {images.map((el, i) => (
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
