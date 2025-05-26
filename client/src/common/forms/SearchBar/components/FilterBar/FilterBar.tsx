/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/elements/Title";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { FC, useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import LabelsCol from "./components/LabelsCol";
import ValsCol from "./components/ValsCol";
import BtnResults from "./components/BtnResults";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";

type PropsType = {
  filters?: FilterSearch[];
  numericFilters?: NumericFilterSearch[];
  hook: any;
  txtInputs?: FormFieldBasic[];
  innerJoinCat?: boolean;
};

// ? I AM NOT PRETTY SURE I USED CORRECT WAY TO SPLIT COLS AND ALLOW SCROLL, ACTUALLY IT TOKE ME LONGER THAN I WAS EXPECTED TO UNDERSTAND PATTERN PARENT-CHILD ABOUT HEIGHTS AND MAX-H, BEING ELEMENTS MORE NESTED THAN THE SIDEBAR MAYBE I MIX A LITTLE THEIR SIZES

const FilterBar: FC<PropsType> = ({
  filters,
  numericFilters,
  txtInputs,
  hook,
  innerJoinCat,
}) => {
  const [triggerRtk, res] = hook;
  const {
    bars: { filterBar },
    setBar,
  } = useSearchCtx();
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listenClick = (e: MouseEvent) => {
      if (!barRef.current) return;

      if (!barRef.current.contains(e.target as Node))
        setBar({ val: false, el: "filterBar" });
    };

    document.addEventListener("mousedown", listenClick);
    return () => {
      document.removeEventListener("mousedown", listenClick);
    };
  }, [setBar]);

  return (
    <div
      ref={barRef}
      className={`fixed w-full bottom-0 left-0 border-[3px] border-blue-600 rounded-t-2xl z__popup bg-neutral-950 h-full max-h-[75%] flex flex-col items-start transition-all duration-500 z__popup ${
        filterBar
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      {/* THIS ALLOW CHILDREN SCROLL */}
      <div className="flex flex-col items-start scroll_app scroll_y overflow-y-hidden max-h-full h-full relative w-full">
        {/* JUST A LABEL AND A CLOSE BTN, HEIGHT DOES NOT MATTER HERE I THINK */}
        <div className="w-full pt-2 border-b-[3px] border-blue-600">
          <div className="flex justify-between items-center px-4">
            <Title {...{ title: "filter", styleParent: "justify-start" }} />

            <button
              onClick={() => setBar({ el: "filterBar", val: false })}
              type="button"
              className="justify-self-end btn__logic_xl text-red-600"
            >
              <IoCloseSharp className="icon__xl" />
            </button>
          </div>
        </div>

        {/* I AM NOT SURE ABOUT THIS PART, THE FACT IS THAT IF I REMOVED SCROLL CLASSES JUST  BIGGER PARENT SCROLL, LEAVING THEM IS LIKE PASSING SCROLL AD PROPS TO CHILDREN METAPHORICALLY, AND PASSING DOWN SCROLL PROP IN A KIND OF RECURSIVE WAY AT THE END ALLOW USER TO SEE A SPLITTED GRID WITH DIFFERENT SCROLL BAR AS I WANTED*/}
        <div className="grid grid-cols-[65px_3px_1fr] sm:grid-cols-[75px_3px_1fr] md:grid-cols-[1fr_3px_2fr]  scroll_app scroll_y overflow-y-auto  max-h-full w-full pb-[75px]">
          {/* LAST CHILD ,REAL CONSUMER OF SCROLL EFFECT */}
          <LabelsCol {...{ filters, numericFilters }} />
          {/* AVOID HERE SCROLL OR THERE WOULD BE TOO MUCH SCROLL BARS RESULTING CONFUSING, THEN WOULD ALSO BE UNCOMFORTABLE TO GRAB THE RIGHT ONE SCROLL BAR OF COL HAVING TWO OF THEM TOO NEAR EACH OTHER */}
          <div className="max-h-full overflow-hidden w-full">
            <div className="min-h-screen bg-blue-600 w-[3px] overflow-hidden"></div>
          </div>

          <ValsCol {...{ innerJoinCat }} />
        </div>

        <BtnResults {...{ res, txtInputs, triggerRtk }} />
      </div>
    </div>
  );
};

export default FilterBar;
