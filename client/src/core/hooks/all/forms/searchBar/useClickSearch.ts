/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDefValsPagination, saveStorage } from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { useCallback } from "react";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { UseFormReturn } from "react-hook-form";

type Params = {
  ctx: any;
  formCtx: UseFormReturn<any>;
  txtInputs: FormFieldBasic[];
};

export const useClickSearch = ({ ctx, txtInputs, formCtx }: Params) => {
  const { keyStorageLabels } = useGetSearchKeysStorage();

  const { setIsPending, args, updateValsNoDebounce, setTxtInputs } = ctx;
  const { reset, getValues } = formCtx;

  const handleSearch = useCallback(() => {
    setIsPending({ el: "submit", val: true });

    const data = {
      ...getValues(),
      ...getDefValsPagination(args),
    };
    updateValsNoDebounce({ vals: data, force: true });
  }, [args, getValues, setIsPending, updateValsNoDebounce]);

  const handleClear = useCallback(() => {
    setIsPending({ el: "clear", val: true });

    const defArgs = getDefValsPagination();
    updateValsNoDebounce({ vals: defArgs, force: true });
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
  ]);

  return {
    handleSearch,
    handleClear,
  };
};
