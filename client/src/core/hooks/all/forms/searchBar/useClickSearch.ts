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
  const { keyStorageVals, keyStorageLabels } = useGetSearchKeysStorage();

  const { setPreSubmit, setIsPending, args, setArgs, setTxtInputs, oldVals } =
    ctx;
  const { reset, getValues } = formCtx;

  const handleSearch = useCallback(() => {
    setIsPending({ el: "submit", val: true });

    const data = {
      ...getValues(),
      ...getDefValsPagination(args),
    };

    oldVals.current = data;
    setArgs({
      ...data,
      _: Date.now(),
    });
  }, [args, getValues, setArgs, setIsPending, oldVals]);

  const handleClear = useCallback(() => {
    setPreSubmit({ el: "canMakeAPI", val: false });
    setIsPending({ el: "clear", val: true });

    const defArgs = getDefValsPagination();

    oldVals.current = defArgs;
    setArgs({ ...defArgs, _: Date.now() });
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
    oldVals,
  ]);

  return {
    handleSearch,
    handleClear,
  };
};
