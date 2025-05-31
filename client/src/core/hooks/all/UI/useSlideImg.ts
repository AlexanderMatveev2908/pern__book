/* eslint-disable @typescript-eslint/no-explicit-any */
import { tailwindBreak } from "@/core/config/breakpoints";
import { clearTimer } from "@/core/lib/lib";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";

type Params = {
  items: any[];
};

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

const calcBlock = (lenImgs: number, imgsBySwap: number) =>
  Math.floor(lenImgs / imgsBySwap);

export const useSlideImg = ({ items }: Params) => {
  const [currSlide, setCurrSlide] = useState<number>(0);
  const [wImg, setWImg] = useState(obj.size());
  const clickedRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [imgsForSwap, setImgsForSwap] = useState(obj.num());

  useEffect(() => {
    const resize = () => {
      setImgsForSwap(obj.num());
      setWImg(obj.size());
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const numBlocks = useMemo(
    () => calcBlock(items.length, imgsForSwap),
    [imgsForSwap, items]
  );

  const arrParent = useMemo(
    () =>
      Array.from({ length: numBlocks }, (_, i) => ({
        id: v4(),
        items: items
          .slice(i * imgsForSwap, (i + 1) * imgsForSwap)
          .filter((val) => !!val),
      })),
    [imgsForSwap, items, numBlocks]
  );

  const handleClickRef = () => {
    clearTimer(timerRef);

    timerRef.current = setTimeout(() => {
      clickedRef.current = false;
      clearTimer(timerRef);
    }, 5000);
  };

  const stopSlide = () => {
    clearTimer(timerRef);
    clickedRef.current = true;
  };
  const startSlide = () => {
    clearTimer(timerRef);
    clickedRef.current = false;
  };

  const incSlide = useCallback(() => {
    setCurrSlide((prev) => {
      const maxStart = Math.max(0, Math.floor(items.length / imgsForSwap) - 1);
      const next = prev + 1;

      if (next > maxStart) return 0;

      return next;
    });
  }, [items, imgsForSwap]);

  const decSlide = () => {
    setCurrSlide((prev) => {
      const maxStart = Math.max(0, Math.floor(items.length / imgsForSwap) - 1);
      const nextPrev = prev - 1;
      return nextPrev < 0 ? maxStart : nextPrev;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!clickedRef.current) incSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, [incSlide]);

  return {
    currSlide,
    wImg,
    incSlide,
    decSlide,
    handleClickRef,
    arrParent,
    imgsForSwap,
    numBlocks,
    stopSlide,
    startSlide,
  };
};

// useEffect(() => {
//   const handleResize = () => {
//     setWImg(obj.size());
//     setNumSwap(obj.num());
//   };

//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);
// }, [items]);

// const incSlide = useCallback(() => {
//   setCurrSlide((prev) => {
//     const maxStart = Math.max(0, items.length - numSwap);
//     const next = prev + numSwap;

//     if (next > maxStart) return 0;

//     return next;
//   });
// }, [items, numSwap]);

// const decSlide = () => {
//   setCurrSlide((prev) => {
//     const maxStart = Math.max(0, items.length - numSwap);
//     const nextPrev = prev - numSwap;
//     return nextPrev < 0 ? maxStart : nextPrev;
//   });
// };

// useEffect(() => {
//   const interval = setInterval(() => {
//     if (!clickedRef.current) incSlide();
//   }, 2500);

//   return () => clearInterval(interval);
// }, [incSlide]);
