/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { FieldValues, UseFormGetValues } from "react-hook-form";
import {
  clearTimer,
  getDefValsPagination,
  isSameData,
  saveStorage,
} from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type Params<T extends FieldValues> = {
  txtInputs: FormFieldBasic[];
  realTimeVals: T;
  ctx: SearchCtxValsConsumer;
  getValues: UseFormGetValues<T>;
  trigger: any;
};

export const useDebounceSearch = ({
  txtInputs,
  ctx,
  realTimeVals,
  getValues,
  trigger,
}: Params<any>) => {
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const {
    oldVals,
    preSubmit: { canMakeAPI, isPopulated, hasFormErrs },
    setPreSubmit,
    pagination: { limit },
  } = ctx;

  const { keyStorageVals } = useGetSearchKeysStorage();

  useEffect(() => {
    timerID.current = setTimeout(() => {
      if (!isPopulated) return;

      const currVals = { ...getValues(), ...getDefValsPagination(0, limit) };
      const isSame: boolean = isSameData(oldVals.current, currVals);

      // __cg("old", oldVals.current);
      // __cg("curr", currVals);
      // __cg("same", isSame);

      if (isSame) {
        if (!canMakeAPI) setPreSubmit({ el: "canMakeAPI", val: true });
        clearTimer(timerID);
        return;
      }

      oldVals.current = currVals;
      saveStorage({
        key: keyStorageVals,
        data: currVals,
      });

      // ? IS DIFFERENT FROM BTN_DISABLED CAUSE THE BTN IS UPDATE IS REAL_TIME WITH WATCH TO PROVIDE ACCURATE INFO ABOUT ERRORS KEYS AND MSGS, CAN_MAKE_API IS MORE ABOUT PREVENTING API TO RUN FOR UNNECESSARY REASONS, LIKE IF I ALREADY SET ARGS OR ADD FIELDS TO ARGS BUT THEY ARE EMPTY STRINGS AND WOULD NOT CHANGE THE SQL QUERY TO GET DATA
      if (canMakeAPI && !hasFormErrs) trigger(currVals);
      else if (!canMakeAPI) setPreSubmit({ el: "canMakeAPI", val: true });

      clearTimer(timerID);
    }, 1000);

    return () => {
      clearTimer(timerID);
    };
  }, [
    txtInputs,
    hasFormErrs,
    getValues,
    keyStorageVals,
    trigger,
    realTimeVals,
    canMakeAPI,
    isPopulated,
    setPreSubmit,
    oldVals,
    limit,
  ]);
};
