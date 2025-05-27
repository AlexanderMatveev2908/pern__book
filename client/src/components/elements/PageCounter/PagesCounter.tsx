/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";
import BtnCounter from "./components/BtnCounter";
import {
  calcBlockBySize,
  cpyObj,
  getNumBtns,
  makeDelay,
  saveStorage,
  setLimitCards,
} from "@/core/lib/lib";
import { useLocation, useParams } from "react-router-dom";
import { calcSearchbarID } from "@/core/lib/all/utils/ids";
import { useGetSearchKeysStorage } from "@/core/hooks/all/forms/searchBar/useGetSearchKeysStorage";
import { UseFormGetValues } from "react-hook-form";
import { ParamsPage } from "@/core/contexts/SearchCtx/reducer/actions";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";

type PropsType = {
  totPages?: number;
  getValues: UseFormGetValues<any>;
  triggerRtk: any;
  paramID?: string;
};

const PagesCounter: FC<PropsType> = ({
  triggerRtk,
  totPages = 0,
  getValues,
  paramID,
}) => {
  const {
    setPreSubmit,
    preSubmit: { hasFormErrs },
    pagination: { page, limit },
    setPagination,
    oldVals,
  } = useSearchCtx();
  const { keyStorage } = useGetSearchKeysStorage();

  const routeID = useParams()?.[paramID ?? ""];

  const [ids] = useState(Array.from({ length: totPages }, () => v4()));
  const [sizeBLock, setSizeBlock] = useState(getNumBtns());
  const [currBlock, setCurrBlock] = useState(0);
  const hasSetBlock = useRef<boolean>(false);
  const path = useLocation().pathname;
  const searchBarID = useMemo(() => calcSearchbarID(path), [path]);

  const handlePagination = useCallback(
    ({ page, limit, val }: { limit?: "limit"; page?: "page"; val: number }) => {
      setPreSubmit({ el: "canMakeAPI", val: false });

      setPagination({ el: (page ?? limit) as "limit" | "page", val });

      const data = cpyObj({
        ...getValues(),
        page: page ? val : 0,
        limit: limit ? val : setLimitCards(),
      });
      oldVals.current = data;
      triggerRtk({ vals: data, routeID });

      saveStorage({
        key: keyStorage as any,
        data,
      });
    },
    [
      setPreSubmit,
      triggerRtk,
      keyStorage,
      oldVals,
      setPagination,
      getValues,
      routeID,
    ]
  );

  const setPagPreventFetch = useCallback(
    ({ el, val }: ParamsPage) => {
      setPreSubmit({ el: "canMakeAPI", val: false });

      setPagination({ el, val });
    },
    [setPreSubmit, setPagination]
  );

  useEffect(() => {
    if (hasSetBlock.current) return;
    hasSetBlock.current = true;

    setCurrBlock(calcBlockBySize(page, sizeBLock));
  }, [sizeBLock, page]);

  useEffect(() => {
    const updatePage = () => {
      if (page >= totPages) setPagPreventFetch({ el: "page", val: 0 });
    };

    updatePage();

    window.addEventListener("resize", updatePage);
    return () => {
      window.removeEventListener("resize", updatePage);
    };
  }, [page, setPagPreventFetch, totPages]);

  useEffect(() => {
    const listenResize = () => {
      // ? BLOCK BUTTONS
      const newBlockCount = getNumBtns();
      const maxCards = setLimitCards();
      const maxPossibleBlock = Math.max(0, Math.ceil(totPages / sizeBLock));

      if (sizeBLock !== newBlockCount) setSizeBlock(newBlockCount);
      if (totPages < newBlockCount || maxPossibleBlock > currBlock)
        setCurrBlock(0);

      if (limit !== maxCards && !hasFormErrs)
        handlePagination({ limit: "limit", val: maxCards });
    };

    window.addEventListener("resize", listenResize);
    return () => {
      window.removeEventListener("resize", listenResize);
    };
  }, [
    currBlock,
    setPagPreventFetch,
    limit,
    getValues,
    totPages,
    page,
    sizeBLock,
    handlePagination,
    hasFormErrs,
  ]);

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
      handlePagination({ page: "page", val });

      makeDelay(() => {
        const el = document.getElementById(searchBarID);
        if (!el) return;

        window.scroll({
          top: el.offsetHeight,
          behavior: "smooth",
        });
      }, 200);
    },
    [handlePagination, searchBarID]
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
    <div className="page_counter w-full h-[50px] mt-[150px] grid grid-cols-[50px_1fr_50px] items-center gap-5">
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
