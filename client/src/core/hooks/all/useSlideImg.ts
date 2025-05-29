/* eslint-disable @typescript-eslint/no-explicit-any */
import { tailwindBreak } from "@/core/config/breakpoints";
import { clearTimer } from "@/core/lib/lib";
import { useCallback, useEffect, useRef, useState } from "react";

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

export const useSlideImg = ({ items }: Params) => {
  const [currSlide, setCurrSlide] = useState<number>(0);
  const [wImg, setWImg] = useState(obj.size());
  const [numSwap, setNumSwap] = useState(obj.num());
  const clickedRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWImg(obj.size());
      setNumSwap(obj.num());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [items]);

  const handleClickRef = () => {
    clickedRef.current = true;

    clearTimer(timerRef);

    timerRef.current = setTimeout(() => {
      clickedRef.current = false;
      clearTimer(timerRef);
    }, 5000);
  };

  const incSlide = useCallback(() => {
    setCurrSlide((prev) => {
      const maxStart = Math.max(0, items.length - numSwap);
      const next = prev + numSwap;

      if (next > maxStart) return 0;

      return next;
    });
  }, [items, numSwap]);

  const decSlide = () => {
    setCurrSlide((prev) => {
      const maxStart = Math.max(0, items.length - numSwap);
      const nextPrev = prev - numSwap;
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
    numSwap,
    incSlide,
    decSlide,
    handleClickRef,
  };
};

// aaaaaaaaa
