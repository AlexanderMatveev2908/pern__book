/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveStorage, setLimitCards } from "@/core/lib/lib";
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
  const { keyStorageVals, keyStorageLabels } = useGetSearchKeysStorage();

  const { setPreSubmit, setIsPending, args, setArgs, setTxtInputs } = ctx;
  const { reset, getValues } = formCtx;

  const handleSearch = useCallback(() => {
    setIsPending({ el: "submit", val: true });

    setArgs({
      ...getValues(),
      page: args?.page ?? 0,
      limit: args?.limit ?? setLimitCards(),
      _: Date.now(),
    });
  }, [args?.limit, args?.page, getValues, setArgs, setIsPending]);

  const handleClear = useCallback(() => {
    setPreSubmit({ el: "canMakeAPI", val: false });
    setIsPending({ el: "clear", val: true });

    const defArgs = {
      limit: setLimitCards(),
      page: 0,
      _: Date.now(),
    };

    setArgs(defArgs);
    reset({});
    setTxtInputs([txtInputs[0]]);

    saveStorage({
      data: defArgs,
      key: keyStorageVals,
    });
    saveStorage({ data: [txtInputs[0]], key: keyStorageLabels });
  }, [
    keyStorageVals,
    reset,
    setArgs,
    keyStorageLabels,
    setIsPending,
    setPreSubmit,
    setTxtInputs,
    txtInputs,
  ]);

  return {
    handleSearch,
    handleClear,
  };
};
