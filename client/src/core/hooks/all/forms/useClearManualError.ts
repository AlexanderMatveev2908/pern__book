import { useEffect } from "react";
import { FieldErrors, UseFormTrigger } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Params = {
  realTimeVals: any;
  msgsArr: string[];
  triggerForm: UseFormTrigger<any>;
  errors: FieldErrors;
  cond: {
    keyMin?: string;
    keyMax?: string;
  };
};

export const useClearManualError = ({
  realTimeVals,
  msgsArr,
  triggerForm,
  errors,
  cond,
}: Params) => {
  useEffect(() => {
    const { keyMin = "", keyMax = "" } = cond;

    const minQty = +(realTimeVals?.[keyMin] || -Infinity);
    const maxQty = +(realTimeVals?.[keyMax] || Infinity);
    for (const key in errors) {
      const currErr = errors?.[key as keyof typeof errors]?.message ?? "";
      if (msgsArr.includes(currErr as string)) {
        if (minQty < maxQty) {
          triggerForm();
          break;
        }
      }
    }
  }, [realTimeVals, errors, triggerForm, msgsArr, cond]);
};
