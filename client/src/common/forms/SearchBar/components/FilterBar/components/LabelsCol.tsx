import { tailwindBreak } from "@/core/config/breakpoints";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FilterSearch, NumericFilterSearch } from "@/types/types";
import { FC, useCallback, useEffect, useState } from "react";

type PropsType = {
  filters?: FilterSearch[];
  numericFilters?: NumericFilterSearch[];
};

const LabelsCol: FC<PropsType> = ({ filters, numericFilters }) => {
  const [showLabel, setShowLabel] = useState(
    window.innerWidth > tailwindBreak.md
  );
  const {
    setSearch,
    searchers: { currFilter },
  } = useSearchCtx();

  useEffect(() => {
    const listenSize = () => setShowLabel(window.innerWidth > tailwindBreak.md);

    window.addEventListener("resize", listenSize);
    return () => {
      window.removeEventListener("resize", listenSize);
    };
  }, []);

  const handleClickLabel = useCallback(
    (el: FilterSearch | NumericFilterSearch) =>
      setSearch({ el: "currFilter", val: el }),
    [setSearch]
  );

  return (
    <div className="scroll_app scrollbar__y overflow-y-auto  max-h-full px-4 py-3">
      <div className="w-full max-w-full grid grid-cols-1 gap-y-3">
        {[
          ...(filters ?? []),
          ...(Array.isArray(numericFilters) ? numericFilters : []),
        ].map((el) => (
          <button
            onClick={() => handleClickLabel(el)}
            type="button"
            key={el.id}
            className={`w-fit max-w-full flex items-center gap-x-5 justify-start hover:text-blue-600 transition-[color] duration-300 flex-wrap cursor-pointer ${
              currFilter?.label === el.label
                ? "border-b-[3px] pb-1 text-blue-600"
                : ""
            }`}
          >
            <el.icon className="icon__md" />
            {showLabel && <span className="txt__3 text-wrap">{el.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LabelsCol;
