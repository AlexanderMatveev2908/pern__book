import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import "./PageCounter.css";
import BtnCounter from "./components/BtnCounter";
import {
  getNumBtns,
  makeDelay,
  saveStorage,
  setLimitCards,
} from "@/core/lib/lib";
import { useLocation } from "react-router-dom";
import { getSearchBarID } from "@/core/lib/all/utils/ids";
import { useGetSearchKeysStorage } from "@/core/hooks/all/forms/searchBar/useGetSearchKeysStorage";

type PropsType = {
  totPages: number;
};

const PagesCounter: FC<PropsType> = ({ totPages }) => {
  const {
    pagination: { page, block, limit },
    setPagination,
    setArgs,
    args,
  } = useSearchCtx();
  const { keyStorageVals } = useGetSearchKeysStorage();

  const [ids] = useState(Array.from({ length: totPages }, () => v4()));
  const [sizeBLock, setSizeBlock] = useState(getNumBtns());
  const path = useLocation().pathname;
  const searchBarID = useMemo(() => getSearchBarID(path), [path]);

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

      makeDelay(() => {
        const el = document.getElementById(searchBarID);
        if (!el) return;
        const h = el.offsetHeight;
        const top = el.getBoundingClientRect().top;

        window.scroll({
          top: top - h,
          behavior: "smooth",
        });
      }, 200);
    },
    [args, block, keyStorageVals, setArgs, setPagination, limit, searchBarID]
  );

  const vals = useMemo(
    () =>
      Array.from(
        { length: getNumBtns() },
        (_, i) => i + block * sizeBLock
      ).filter((val) => val < totPages + 1),
    [block, sizeBLock, totPages]
  );

  return (
    <div className="w-full h-[50px] mt-[150px] grid grid-cols-[50px_1fr_50px] items-center gap-5">
      {block ? (
        <button
          disabled={!block}
          onClick={handlePrev}
          type="button"
          className="appearance-none disabled:opacity-50 hover:text-blue-600 btn__logic_xl justify-self-start"
        >
          <ArrowBigLeft className="icon__xl" />
        </button>
      ) : (
        <div className=""></div>
      )}

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
