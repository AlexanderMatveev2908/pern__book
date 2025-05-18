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
  txtInputs: FormFieldBasic[];
  trigger: any;
};

export const useClickSearch = ({
  ctx,
  txtInputs,
  formCtx,
  trigger,
}: Params) => {
  const { keyStorageVals } = useGetSearchKeysStorage();

  const {
    setIsPending,
    pagination: { limit },
    updateValsNoDebounce,
    setPagination,
  } = ctx;
  const { reset, getValues } = formCtx;

  const handleSearch = useCallback(() => {
    setIsPending({ el: "submit", val: true });

    const data = {
      ...getValues(),
      ...getDefValsPagination(0, limit),
    };

    updateValsNoDebounce({ vals: data, trigger });
  }, [limit, getValues, setIsPending, trigger, updateValsNoDebounce]);

  const handleClear = useCallback(() => {
    setIsPending({ el: "clear", val: true });

    const defVals = {
      items: [{ ...cpyObj(txtInputs[0]), id: v4(), val: "" }],
    };
    const merged = {
      ...defVals,
      ...getDefValsPagination(0),
    };

    setPagination({ el: "page", val: 0 });

    updateValsNoDebounce({ vals: merged as any, trigger });

    reset(defVals);

    saveStorage({ data: merged, key: keyStorageVals });
  }, [
    reset,
    keyStorageVals,
    setIsPending,
    txtInputs,
    updateValsNoDebounce,
    trigger,
    setPagination,
  ]);

  return {
    handleSearch,
    handleClear,
  };
};
