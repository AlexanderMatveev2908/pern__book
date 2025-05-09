import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import "./PageCounter.css";
import BtnCounter from "./components/BtnCounter";
import { __cg, getNumBtns, saveStorage, setLimitCards } from "@/core/lib/lib";
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

  const [ids] = useState(Array.from({ length: totPages }, () => v4()));
  const [sizeBLock, setSizeBlock] = useState(getNumBtns());

  useEffect(() => {
    const listenResize = () => {
      const maxSizeBtns = getNumBtns();
      setSizeBlock(maxSizeBtns);
      const maxCards = setLimitCards();

      if (totPages < maxSizeBtns) setPagination({ el: "block", val: 0 });
      else setPagination({ el: "limit", val: maxCards });

      setArgs({ ...args, limit: maxCards });
    };

    window.addEventListener("resize", listenResize);
    return () => {
      window.removeEventListener("resize", listenResize);
    };
  }, [setPagination, block, limit, setArgs, args, totPages]);

  useEffect(() => {
    if (totPages < getNumBtns() && block)
      setPagination({ el: "block", val: 0 });
  }, [setPagination, totPages, block]);

  const handlePrev = useCallback(
    () => (block ? setPagination({ el: "block", val: block - 1 }) : null),

    [block, setPagination]
  );
  const handleNext = useCallback(
    () =>
      totPages * limit < page + 1
        ? null
        : setPagination({ el: "block", val: block + 1 }),
    [block, setPagination, limit, totPages, page]
  );

  const handlePage = useCallback(
    (val: number) => {
      setPagination({ el: "page", val });
      setArgs({
        ...args,
        page: val,
        limit,
      });
      // eslint-disable-next-line
      const { limit: _, ...rest } = args;
      saveStorage({
        key: keyStorageVals,
        data: {
          ...rest,
          page: val,
          block,
        },
      });
    },
    [args, block, keyStorageVals, setArgs, setPagination, limit]
  );

  const vals = useMemo(
    () =>
      Array.from(
        { length: getNumBtns() },
        (_, i) => i + block * sizeBLock
      ).filter((val) => val - 1 < totPages),
    [block, sizeBLock, totPages]
  );

  useEffect(() => {
    // __cg("tot_pages", totPages);
    // __cg("len", ids.length);
    __cg("curr page", page);
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
              handleClick: () => handlePage(val),

              val: val + 1,
            }}
          />
        ))}
      </div>

      {(block + 1) * sizeBLock + 1 > totPages ? null : (
        <button
          onClick={handleNext}
          disabled={(block + 1) * sizeBLock + 1 > totPages}
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
