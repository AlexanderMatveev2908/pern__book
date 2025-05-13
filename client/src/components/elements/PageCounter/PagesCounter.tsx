/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import "./PageCounter.css";
import BtnCounter from "./components/BtnCounter";
import {
  calcBlockBySize,
  getDefValsPagination,
  getNumBtns,
  makeDelay,
  saveStorage,
  setLimitCards,
} from "@/core/lib/lib";
import { useLocation } from "react-router-dom";
import { getSearchBarID } from "@/core/lib/all/utils/ids";
import { useGetSearchKeysStorage } from "@/core/hooks/all/forms/searchBar/useGetSearchKeysStorage";
import { UseFormGetValues } from "react-hook-form";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type PropsType = {
  totPages?: number;
  getValues: UseFormGetValues<any>;
  ctx: SearchCtxValsConsumer;
};

const PagesCounter: FC<PropsType> = ({ ctx, totPages = 0, getValues }) => {
  const {
    setArgs,
    args,
    setPreSubmit,
    preSubmit: { hasFormErrs },
  } = ctx;
  const { limit = setLimitCards(), page = 0 } = args ?? {};
  const { keyStorageVals } = useGetSearchKeysStorage();

  const [ids] = useState(Array.from({ length: totPages }, () => v4()));
  const [sizeBLock, setSizeBlock] = useState(getNumBtns());
  const [currBlock, setCurrBlock] = useState(0);
  const path = useLocation().pathname;
  const searchBarID = useMemo(() => getSearchBarID(path), [path]);

  useEffect(() => {
    setCurrBlock(calcBlockBySize(page, sizeBLock));
  }, [sizeBLock, page]);

  useEffect(() => {
    if (page >= totPages)
      setArgs({
        ...getValues(),
        ...getDefValsPagination(),
      });
  }, [getValues, page, setArgs, totPages]);

  useEffect(() => {
    const listenResize = () => {
      const maxSizeBtns = getNumBtns();
      const maxCards = setLimitCards();

      if (sizeBLock !== maxSizeBtns) setSizeBlock(maxSizeBtns);
      if (totPages < maxSizeBtns) setCurrBlock(0);
      if (page >= totPages)
        setArgs({
          ...getValues(),
          page: 0,
          limit: maxCards,
        });

      const maxPossible = Math.max(0, Math.ceil(totPages / sizeBLock));
      if (maxPossible > currBlock) setCurrBlock(0);

      if (limit !== maxCards)
        setArgs({
          ...getValues(),
          page,
          limit: maxCards,
        });
    };

    window.addEventListener("resize", listenResize);
    return () => {
      window.removeEventListener("resize", listenResize);
    };
  }, [currBlock, limit, getValues, setArgs, totPages, page, sizeBLock]);

  const handlePrev = useCallback(
    () => (currBlock ? setCurrBlock((prev) => prev - 1) : null),

    [currBlock]
  );
  const handleNext = useCallback(
    () =>
      totPages * (limit ?? 4) < page + 1
        ? null
        : setCurrBlock((prev) => prev + 1),
    [limit, totPages, page]
  );

  const handlePage = useCallback(
    (val: number) => {
      setPreSubmit({ el: "canMakeAPI", val: false });

      setArgs({
        ...args,
        page: val,
        limit: setLimitCards(),
      });
      saveStorage({
        key: keyStorageVals,
        data: {
          ...args,
          page: val,
        },
      });

      makeDelay(() => {
        const el = document.getElementById(searchBarID);
        if (!el) return;

        window.scroll({
          top: el.offsetHeight,
          behavior: "smooth",
        });
      }, 200);
    },
    [args, setPreSubmit, keyStorageVals, setArgs, searchBarID]
  );

  const vals = useMemo(
    () =>
      Array.from(
        { length: getNumBtns() },
        (_, i) => i + currBlock * sizeBLock
      ).filter((val) => val < totPages),
    [currBlock, sizeBLock, totPages]
  );

  return !totPages ? null : (
    <div className="w-full h-[50px] mt-[150px] grid grid-cols-[50px_1fr_50px] items-center gap-5">
      {currBlock ? (
        <button
          disabled={!currBlock || hasFormErrs}
          onClick={handlePrev}
          type="button"
          className="appearance-none disabled:opacity-50 enabled:hover:text-blue-600 btn__logic_xl justify-self-start"
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
              isDisabled: hasFormErrs,
            }}
          />
        ))}
      </div>

      {(currBlock + 1) * sizeBLock + 1 > totPages ? null : (
        <button
          onClick={handleNext}
          disabled={(currBlock + 1) * sizeBLock + 1 > totPages || hasFormErrs}
          type="button"
          className="disabled:opacity-50 enabled:hover:text-blue-600 appearance-none btn__logic_xl justify-self-end"
        >
          <ArrowBigRight className="icon__xl" />
        </button>
      )}
    </div>
  );
};

export default PagesCounter;
