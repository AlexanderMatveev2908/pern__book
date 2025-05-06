import Title from "@/components/elements/Title";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FC, useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";

type PropsType = {};

const FilterBar: FC<PropsType> = ({}) => {
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
      className={`fixed w-full top-[25%] left-0 border-[3px] border-b-0 border-blue-600 rounded-t-2xl z__popup bg-neutral-950 h-[75%] grid grid-cols-1 items-start p-4 transition-all duration-500 z__popup ${
        filterBar
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="w-full flex justify-between items-center">
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
  );
};

export default FilterBar;
