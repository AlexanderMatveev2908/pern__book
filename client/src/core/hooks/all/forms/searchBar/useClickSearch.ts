/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDefValsPagination, saveStorage } from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { useCallback } from "react";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { UseFormReturn } from "react-hook-form";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

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
  const { keyStorageLabels } = useGetSearchKeysStorage();

  const { setIsPending, args, updateValsNoDebounce, setTxtInputs } = ctx;
  const { reset, getValues } = formCtx;

  const handleSearch = useCallback(() => {
    setIsPending({ el: "submit", val: true });

    const data = {
      ...getValues(),
      ...getDefValsPagination(args?.page),
    };

    updateValsNoDebounce({ vals: data, trigger });
  }, [args?.page, getValues, setIsPending, trigger, updateValsNoDebounce]);

  const handleClear = useCallback(() => {
    setIsPending({ el: "clear", val: true });

    const defArgs = getDefValsPagination();
    updateValsNoDebounce({ vals: defArgs, trigger });
    reset({});

    setTxtInputs([txtInputs[0]]);
    saveStorage({ data: [txtInputs[0]], key: keyStorageLabels });
  }, [
    reset,
    keyStorageLabels,
    setIsPending,
    setTxtInputs,
    txtInputs,
    updateValsNoDebounce,
    trigger,
  ]);

  return {
    handleSearch,
    handleClear,
  };
};
