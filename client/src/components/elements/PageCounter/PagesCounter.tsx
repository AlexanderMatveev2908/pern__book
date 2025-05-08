import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import "./PageCounter.css";
import BtnCounter from "./components/BtnCounter";
import { getNumBtns, setLimitCards } from "@/core/lib/lib";

type PropsType = {
  totPages: number;
};

const PagesCounter: FC<PropsType> = ({ totPages }) => {
  const {
    pagination: { page, block, limit },
    setPagination,
  } = useSearchCtx();

  const [ids, setIds] = useState(
    Array.from({ length: getNumBtns() }, () => v4())
  );

  useEffect(() => {
    const listenResize = () => {
      setIds(Array.from({ length: getNumBtns() }, () => v4()));

      setPagination({ el: "limit", val: setLimitCards() });
    };

    window.addEventListener("resize", listenResize);
    return () => {
      window.removeEventListener("resize", listenResize);
    };
  }, [setPagination, block, limit]);

  const handlePrev = useCallback(
    () => (block ? setPagination({ el: "block", val: block - 1 }) : null),
    [block, setPagination]
  );
  const handleNext = useCallback(
    () => setPagination({ el: "block", val: block + 1 }),
    [block, setPagination]
  );

  const vals = useMemo(
    () =>
      Array.from(
        { length: getNumBtns() },
        (_, i) => i + 1 + block * ids.length
      ),
    [block, ids.length]
  );

  console.log(block);

  return (
    <div className="w-full h-[50px] mt-[150px] grid grid-cols-[50px_1fr_50px] items-center gap-5">
      <button
        disabled={!block}
        onClick={handlePrev}
        type="button"
        className="appearance-none disabled:opacity-50 btn__logic_xl justify-self-start"
      >
        <ArrowBigLeft className="icon__xl" />
      </button>

      <div className="w-full flex justify-between items-center gap-5">
        {ids.map((id, i) => (
          <BtnCounter
            key={id}
            {...{
              isIn: i === page,
              handleClick: () => setPagination({ el: "page", val: i }),
              val: vals[i],
            }}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        type="button"
        className="appearance-none btn__logic_xl justify-self-end"
      >
        <ArrowBigRight className="icon__xl" />
      </button>
    </div>
  );
};

export default PagesCounter;
