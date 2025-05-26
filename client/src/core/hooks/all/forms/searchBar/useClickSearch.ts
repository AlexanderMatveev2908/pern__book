/* eslint-disable @typescript-eslint/no-explicit-any */
import { cpyObj, getDefValsPagination, saveStorage } from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { useCallback } from "react";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { UseFormReturn } from "react-hook-form";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { v4 } from "uuid";

type Params = {
  ctx: SearchCtxValsConsumer;
  formCtx: UseFormReturn<any>;
  txtInputs?: FormFieldBasic[];
  triggerRtk: any;
  routeID?: string;
};

export const useClickSearch = ({
  ctx,
  txtInputs,
  formCtx,
  triggerRtk,
  routeID,
}: Params) => {
  const { keyStorage } = useGetSearchKeysStorage();

  const {
    setIsPending,
    pagination: { limit },
    updateValsNoDebounce,
    setPagination,
  } = ctx;
  const { reset, getValues } = formCtx;

  const handleSearch = useCallback(() => {
    setIsPending({ el: "submit", val: true });

    const data = cpyObj({
      ...getValues(),
      ...getDefValsPagination(0, limit),
    });

    updateValsNoDebounce({ vals: data, triggerRtk, routeID });
  }, [
    limit,
    getValues,
    setIsPending,
    triggerRtk,
    routeID,
    updateValsNoDebounce,
  ]);

  const handleClear = useCallback(() => {
    setIsPending({ el: "clear", val: true });

    const defVals = {
      items: [{ ...(txtInputs?.[0] ?? {}), id: v4(), val: "" }],
    };
    const merged = cpyObj({
      ...defVals,
      ...getDefValsPagination(0),
    });

    setPagination({ el: "page", val: 0 });

    updateValsNoDebounce({ vals: merged as any, triggerRtk, routeID });

    reset(defVals);

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
  ]);

  return {
    handleSearch,
    handleClear,
  };
};
