import Title from "@/components/elements/Title";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FiltersSearch } from "@/types/types";
import { FC, useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";

type PropsType = {
  filters: FiltersSearch[];
};

const FilterBar: FC<PropsType> = ({ filters }) => {
  const barRef = useRef<HTMLDivElement | null>(null);

  const {
    bars: { filterBar },
    setBar,
  } = useSearchCtx();

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
  }, []);

  return (
    <div
      ref={barRef}
      className={`fixed w-full bottom-0 left-0 border-[3px] border-blue-600 rounded-t-2xl z__popup bg-neutral-950 h-full max-h-[75vh] grid grid-cols-1 items-start transition-all duration-500 z__popup overflow-hidden ${
        filterBar
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="flex flex-col items-start h-full max-h-full overflow-y-hidden">
        <div className="w-full sticky top-0 z-60 bg-neutral-950 pt-2 border-b-[3px] border-blue-600 h-full max-h-fit">
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

        <div className="grid grid-cols-[1fr_10px_1fr] max-h-full">
          <div className="scrollbar__app scrollbar__y overflow-y-auto  max-h-full">
            {`   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            numquam iusto odio tempore incidunt eveniet minima explicabo magni
            eum adipisci quibusdam dicta, accusantium, commodi fugit maxime!
            Sunt, velit ullam. Molestiae!`.repeat(10)}
          </div>
          <div className="h-full bg-blue-600 w-[3px]"></div>
          <div className="scrollbar__app scrollbar__y overflow-y-auto  max-h-full">
            {` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            numquam iusto odio tempore incidunt eveniet minima explicabo magni
            eum adipisci quibusdam dicta, accusantium, commodi fugit maxime!
            Sunt, velit ullam. Molestiae!`.repeat(100)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
