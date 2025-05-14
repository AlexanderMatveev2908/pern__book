/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { FieldValues, UseFormGetValues } from "react-hook-form";
import {
  clearTimer,
  isSameData,
  saveStorage,
  setLimitCards,
} from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type Params<T extends FieldValues> = {
  txtInputs: FormFieldBasic[];
  realTimeVals: T;
  ctx: SearchCtxValsConsumer;
  getValues: UseFormGetValues<T>;
};

export const useDebounceSearch = ({
  txtInputs,
  ctx,
  realTimeVals,
  getValues,
}: Params<any>) => {
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const {
    setArgs,
    oldVals,
    preSubmit: { canMakeAPI, isPopulated, hasFormErrs },
    setPreSubmit,
    args,
  } = ctx;

  const { limit = setLimitCards(), page = 0 } = args ?? {};
  const { keyStorageVals } = useGetSearchKeysStorage();

  useEffect(() => {
    timerID.current = setTimeout(() => {
      const currVals = { ...getValues(), limit, page };
      const isSame: boolean = isSameData(oldVals.current, currVals);

      // __cg("old", oldVals.current);
      // __cg("curr", currVals);
      // __cg("same", isSame);

      if (isSame) {
        if (!canMakeAPI) setPreSubmit({ el: "canMakeAPI", val: true });

        clearTimer(timerID);
        return null;
      }

      oldVals.current = currVals;
      saveStorage({
        key: keyStorageVals,
        data: currVals,
      });

      // ? IS DIFFERENT FROM BTN_DISABLED CAUSE THE BTN IS UPDATE IS REAL_TIME WITH WATCH TO PROVIDE ACCURATE INFO ABOUT ERRORS KEYS AND MSGS, CAN_MAKE_API IS MORE ABOUT PREVENTING API TO RUN FOR UNNECESSARY REASONS, LIKE IF I ALREADY SET ARGS OR ADD FIELDS TO ARGS BUT THEY ARE EMPTY STRINGS AND WOULD NOT CHANGE THE SQL QUERY TO GET DATA
      if (canMakeAPI && !hasFormErrs) setArgs(currVals);
      else if (!canMakeAPI) setPreSubmit({ el: "canMakeAPI", val: true });

      clearTimer(timerID);
    }, 1000);

    return () => {
      clearTimer(timerID);
    };
  }, [
    txtInputs,
    hasFormErrs,
    limit,
    getValues,
    keyStorageVals,
    setArgs,
    realTimeVals,
    canMakeAPI,
    isPopulated,
    page,
    setPreSubmit,
    oldVals,
  ]);
};
