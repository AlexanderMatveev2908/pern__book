import { tailwindBreak } from "@/core/config/breakpoints";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import "./PageCounter.css";
import BtnCounter from "./components/BtnCounter";

const getSize = () =>
  window.innerWidth > tailwindBreak.xl
    ? 10
    : window.innerWidth > tailwindBreak.lg
    ? 8
    : window.innerWidth > tailwindBreak.md
    ? 6
    : window.innerWidth > tailwindBreak.sm
    ? 5
    : window.innerWidth > 500
    ? 4
    : 3;

const PagesCounter: FC = () => {
  const [ids, setIds] = useState(
    Array.from({ length: getSize() }, (_, i) => ({ val: i + 1, id: v4() }))
  );

  useEffect(() => {
    const listenResize = () => {
      setIds(
        Array.from({ length: getSize() }, (_, i) => ({ val: i + 1, id: v4() }))
      );
    };

    window.addEventListener("resize", listenResize);
    return () => {
      window.removeEventListener("resize", listenResize);
    };
  }, []);

  const {
    pagination: { page },
    setPagination,
  } = useSearchCtx();

  return (
    <div className="w-full h-[50px] mt-[150px] grid grid-cols-[50px_1fr_50px] items-center gap-5">
      <button
        type="button"
        className="appearance-none btn__logic_xl justify-self-start"
      >
        <ArrowBigLeft className="icon__xl" />
      </button>

      <div className="w-full flex justify-between items-center gap-5">
        {ids.map((el, i) => (
          <BtnCounter
            key={el.id}
            {...{
              isIn: i === page,
              handleClick: () => setPagination({ el: "page", val: i }),
              val: el.val,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        className="appearance-none btn__logic_xl justify-self-end"
      >
        <ArrowBigRight className="icon__xl" />
      </button>
    </div>
  );
};

export default PagesCounter;
