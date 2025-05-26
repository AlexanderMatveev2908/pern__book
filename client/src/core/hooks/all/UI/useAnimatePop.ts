import { RefObject, useEffect } from "react";

type Params = {
  popRef: RefObject<HTMLDivElement | null>;
  isPopup: boolean | null;
};

export const useAnimatePop = ({ popRef, isPopup }: Params) => {
  useEffect(() => {
    const animateIn = () => {
      if (!popRef.current || !isPopup) return;

      popRef.current.classList.remove("in");

      requestAnimationFrame(() => {
        popRef.current?.classList.add("in");
      });
    };

    animateIn();
  }, [isPopup, popRef]);

  useEffect(() => {
    const animateOut = () => {
      if (!popRef.current || typeof isPopup === "object" || isPopup) return;

      popRef.current.classList.remove("out");

      requestAnimationFrame(() => {
        popRef.current?.classList.add("out");
      });
    };

    animateOut();
  }, [isPopup, popRef]);

  return {};
};
