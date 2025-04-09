import { FC, useCallback, useEffect, useRef, useState } from "react";
import { heroImages } from "../../config/assetsDev/assetsDev";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import style from "./Hero.module.css";
import { tailwindBreak } from "../../config/breakpoints";

const totLen = heroImages.length;

const getSize = () =>
  window.innerWidth >= tailwindBreak.lg
    ? 350
    : window.innerWidth >= tailwindBreak.md
    ? 300
    : 200;

const Hero: FC = () => {
  const [currSlide, setCurrSlide] = useState<number>(0);
  const [wImg, setWImg] = useState(getSize());
  const clickedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => setWImg(getSize());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickRef = () => {
    clickedRef.current = true;
    setTimeout(() => (clickedRef.current = false), 1000);
  };
  const incSlide = useCallback(
    () => setCurrSlide((prev) => (prev === totLen - 1 ? 0 : prev + 1)),
    []
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

  return (
    <div className="w-full flex px-10">
      <div className="w-full grid text-white mt-10 relative">
        <button
          onClick={decSlide}
          className={`${style.btn__hero} group -left-[20px]`}
        >
          <FaChevronLeft className="icon__md icon__with_txt" />
        </button>

        <div className="w-full flex gap-[25px] overflow-hidden p-5 border-[3px] border-blue-600 rounded-xl">
          <div
            className="flex gap-[25px] transition-all duration-500"
            style={{
              transform: `translateX(-${currSlide * (wImg + 25)}px)`,
            }}
          >
            {heroImages.map((el, i) => (
              <div
                key={el.id}
                className="rounded-xl overflow-hidden"
                style={{ width: wImg, height: wImg }}
              >
                <img src={el.src} alt={`img__${i}`} className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            handleClickRef();
            incSlide();
          }}
          className={`${style.btn__hero} -right-[20px] group`}
        >
          <FaChevronRight className="icon__md icon__with_txt" />
        </button>
      </div>
    </div>
  );
};
export default Hero;
