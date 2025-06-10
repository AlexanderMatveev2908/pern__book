/* eslint-disable @typescript-eslint/no-explicit-any */
import { cpyObj, getDefValsPagination, saveStorage } from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { v4 } from "uuid";
import { filterInnerSubCat } from "@/core/lib/all/utils/processData";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";

type Params = {
  ctx: SearchCtxValsConsumer;
  formCtx: UseFormReturn<any>;
  txtInputs?: FormFieldBasic[];
  triggerRtk: any;
  routeID?: string;
  defVals?: any;
  innerJoinCat?: boolean;
};

export const useClickSearch = ({
  ctx,
  txtInputs,
  formCtx,
  triggerRtk,
  routeID,
  defVals,
  innerJoinCat,
}: Params) => {
  const { keyStorage } = useGetSearchKeysStorage();

  const {
    setIsPending,
    updateValsNoDebounce,
    setPagination,
    setInnerJoinedCat,
  } = ctx;
  const { reset } = formCtx;

  const handleClear = useCallback(() => {
    setIsPending({ el: "clear", val: true });

    const valsFb = {
      items: [{ ...(txtInputs?.[0] ?? {}), id: v4(), val: "" }],
      ...(defVals ?? {}),
    };
    const merged = cpyObj({
      ...valsFb,
      ...getDefValsPagination(0),
    });

    setPagination({ el: "page", val: 0 });

    if (innerJoinCat && defVals?.mainCategories?.length)
      setInnerJoinedCat(filterInnerSubCat(defVals.mainCategories));

    updateValsNoDebounce({ vals: merged as any, triggerRtk, routeID });

    reset(valsFb);

    saveStorage({ data: merged, key: keyStorage as any });
  }, [
    reset,
    keyStorage,
    routeID,
    setIsPending,
    txtInputs,
    updateValsNoDebounce,
    triggerRtk,
    setPagination,
    defVals,
    innerJoinCat,
    setInnerJoinedCat,
  ]);

  return {
    handleClear,
  };
};
