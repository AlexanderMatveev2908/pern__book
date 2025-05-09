import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import "./PageCounter.css";
import BtnCounter from "./components/BtnCounter";
import { getNumBtns, saveStorage, setLimitCards } from "@/core/lib/lib";
import { StorageKeys } from "@/types/types";

type PropsType = {
  totPages: number;
  keyStorageVals: StorageKeys;
};

const PagesCounter: FC<PropsType> = ({ totPages, keyStorageVals }) => {
  const {
    pagination: { page, block, limit },
    setPagination,
    setArgs,
    args,
  } = useSearchCtx();

  const [ids, setIds] = useState(
    Array.from({ length: getNumBtns() }, () => v4())
  );

  useEffect(() => {
    const listenResize = () => {
      setIds(Array.from({ length: getNumBtns() }, () => v4()));

      const maxCards = setLimitCards();
      setPagination({ el: "limit", val: maxCards });
      setArgs({ ...args, limit: maxCards });
    };

    window.addEventListener("resize", listenResize);
    return () => {
      window.removeEventListener("resize", listenResize);
    };
  }, [setPagination, block, limit, setArgs, args]);

  const handlePrev = useCallback(
    () => setPagination({ el: "block", val: block - 1 }),

    [block, setPagination]
  );
  const handleNext = useCallback(
    () =>
      totPages * limit < page + 1
        ? null
        : setPagination({ el: "block", val: block + 1 }),
    [block, setPagination, limit, totPages, page]
  );

  const vals = useMemo(
    () =>
      Array.from(
        { length: getNumBtns() },
        (_, i) => i + block * ids.length
      ).filter((val) => val < totPages),
    [block, ids.length, totPages]
  );

  useEffect(() => {
    // __cg("tot_pages", totPages);
    // __cg("len", ids.length);
    // __cg("curr page", page);
    // __cg("limit", limit);
    // __cg("block", block);
  }, [totPages, limit, block, page, ids]);

  return (
    <div className="w-full h-[50px] mt-[150px] grid grid-cols-[50px_1fr_50px] items-center gap-5">
      <button
        disabled={!block}
        onClick={handlePrev}
        type="button"
        className="appearance-none disabled:opacity-50 hover:text-blue-600 btn__logic_xl justify-self-start"
      >
        <ArrowBigLeft className="icon__xl" />
      </button>

      <div className="w-full flex justify-around items-center gap-5">
        {vals.map((val, i) => (
          <BtnCounter
            key={ids[i]}
            {...{
              isIn: val === page,
              handleClick: () => {
                setPagination({ el: "page", val });
                setArgs({
                  ...args,
                  page: val,
                });
                saveStorage({
                  key: keyStorageVals,
                  data: {
                    ...args,
                    page: val,
                    block,
                  },
                });
              },
              val: val + 1,
            }}
          />
        ))}
      </div>

      {(block + 1) * ids.length + 1 > totPages ? null : (
        <button
          onClick={handleNext}
          disabled={(block + 1) * ids.length + 1 > totPages}
          type="button"
          className="disabled:opacity-50 hover:text-blue-600 appearance-none btn__logic_xl justify-self-end"
        >
          <ArrowBigRight className="icon__xl" />
        </button>
      )}
    </div>
  );
};

export default PagesCounter;
