import Title from "@/components/elements/Title";
import BtnCheckBox from "@/components/forms/inputs/BtnCheckBox/BtnCheckBox";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FiltersSearch, FormFieldBasic } from "@/types/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";

type PropsType = {
  filters: FiltersSearch[];
};

// ? I AM NOT PRETTY SURE I USED CORRECT WAY TO SPLIT COLS AND ALLOW SCROLL, ACTUALLY IT TOKE ME LONGER THAN I WAS EXPECTED TO UNDERSTAND PATTERN PARENT-CHILD ABOUT HEIGHTS AND MAX-H, BEING ELEMENTS MORE NESTED THAN THE SIDEBAR MAYBE I MIX A LITTLE THEIR SIZES

const FilterBar: FC<PropsType> = ({ filters }) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [showLabel, setShowLabel] = useState(window.innerWidth > 400);

  useEffect(() => {
    const listenSize = () => setShowLabel(window.innerWidth > 400);

    window.addEventListener("resize", listenSize);
    return () => {
      window.removeEventListener("resize", listenSize);
    };
  }, []);

  const {
    bars: { filterBar },
    setBar,
    searchers: { currFilter },
  } = useSearchCtx();
  const { watch, setValue } = useFormContext();

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

  const getIsIn = useCallback(
    ({ key, el }: { key: string; el: FormFieldBasic }) => {
      const value = watch(key);

      return Array.isArray(value) ? value.includes(el.field) : false;
    },
    [watch]
  );

  const handleClick = useCallback(
    (el: FormFieldBasic) => {
      const key = currFilter?.field;
      if (!key) return;
      const value = watch(key);

      if (!Array.isArray(value)) {
        setValue(key, [el.field]);
        return;
      }

      setValue(
        key,
        value.includes(el.field)
          ? value.filter((str) => str !== el.field)
          : [...value, el.field]
      );
    },
    [currFilter, setValue, watch]
  );

  console.log(watch());

  return (
    <div
      ref={barRef}
      className={`fixed w-full bottom-0 left-0 border-[3px] border-blue-600 rounded-t-2xl z__popup bg-neutral-950 h-full max-h-[75%] grid grid-cols-1 items-start transition-all duration-500 z__popup ${
        filterBar
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      {/* THIS ALLOW CHILDREN SCROLL */}
      <div className="flex flex-col items-start scrollbar__app scrollbar__y overflow-y-auto max-h-full">
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
        <div className="grid grid-cols-[1fr_3px_1fr] sm:grid-cols-[1fr_3px_2fr] scrollbar__app scrollbar__y overflow-y-auto  max-h-full w-full">
          {/* LAST CHILD ,REAL CONSUMER OF SCROLL EFFECT */}
          <div className="scrollbar__app scrollbar__y overflow-y-auto  max-h-full px-4 py-3">
            <div className="w-full max-w-full grid grid-cols-1 gap-y-3">
              {filters.map((el) => (
                <button
                  type="button"
                  key={el.id}
                  className={`w-fit max-w-full flex   items-center gap-x-5 justify-start hover:text-blue-600 el__flow flex-wrap cursor-pointer ${
                    currFilter?.label === el.label
                      ? "border-b-[3px] pb-1 text-blue-600"
                      : ""
                  }`}
                >
                  <el.icon className="icon__md" />
                  {showLabel && (
                    <span className="txt__3 text-wrap">{el.label}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* AVOID HERE SCROLL OR THERE WOULD BE TOO MUCH SCROLL BARS RESULTING CONFUSING, THEN WOULD ALSO BE UNCOMFORTABLE TO GRAB THE RIGHT ONE SCROLL BAR OF COL HAVING TWO OF THEM TOO NEAR EACH OTHER */}
          <div className="max-h-full overflow-hidden w-full">
            <div className="min-h-screen bg-blue-600 w-[3px] overflow-hidden"></div>
          </div>

          <div className="scrollbar__app scrollbar__y overflow-y-auto  max-h-full px-4 min-w-full py-3 ">
            <div className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.isArray(currFilter?.fields) &&
                currFilter.fields.map((el) => (
                  <div
                    key={el.id}
                    className="w-full max-w-[200px] justify-self-center"
                  >
                    <BtnCheckBox
                      {...{
                        val: el.field,
                        isIn: getIsIn({ key: currFilter.field, el }),
                        handleClick: () => handleClick(el),
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
