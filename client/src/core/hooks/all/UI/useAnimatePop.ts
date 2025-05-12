import { RefObject, useEffect } from "react";

type Params = {
  popRef: RefObject<HTMLDivElement | null>;
  isPopup: boolean | null;
};

export const useAnimatePop = ({ popRef, isPopup }: Params) => {
  useEffect(() => {
    const animateIn = () => {
      if (!popRef.current || !isPopup) return;

      popRef.current.classList.remove("popup_in");

      requestAnimationFrame(() => {
        popRef.current?.classList.add("popup_in");
      });
    };

    animateIn();
  }, [isPopup, popRef]);

  useEffect(() => {
    const animateOut = () => {
      if (!popRef.current || typeof isPopup === "object" || isPopup) return;

      popRef.current.classList.remove("popup_out");

      requestAnimationFrame(() => {
        popRef.current?.classList.add("popup_out");
      });
    };

    animateOut();
  }, [isPopup, popRef]);

  return {};
};
