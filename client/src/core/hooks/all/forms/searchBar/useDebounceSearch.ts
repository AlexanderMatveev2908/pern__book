import { useEffect, useRef } from "react";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { FieldValues, UseFormReturn } from "react-hook-form";
import {
  __cg,
  clearTimer,
  isSameData,
  saveStorage,
  setLimitCards,
} from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { ArgsSearchType } from "@/core/contexts/SearchCtx/reducer/initState";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type Params<T> = {
  txtInputs: FormFieldBasic[];
  realTimeVals: T;
} & SearchCtxValsConsumer &
  UseFormReturn<T & FieldValues>;

export const useDebounceSearch = <T>({
  txtInputs,
  setArgs,
  preSubmit: { canMakeAPI, isPopulated, hasFormErrs },
  setPreSubmit,
  args,
  realTimeVals,
  getValues,
}: Params<T>) => {
  const oldVals = useRef<ArgsSearchType | null>(null);
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const { limit = setLimitCards(), page = 0 } = args ?? {};
  const { keyStorageVals } = useGetSearchKeysStorage();

  useEffect(() => {
    timerID.current = setTimeout(() => {
      const currVals = { ...getValues(), limit, page };
      const isSame: boolean = isSameData(oldVals.current, currVals);

      __cg("old", oldVals.current);
      __cg("new", currVals);
      __cg("same", isSame);

      if (isSame) {
        clearTimer(timerID);
        return null;
      }

      oldVals.current = currVals;
      saveStorage({
        key: keyStorageVals,
        data: currVals,
      });

      // ? IS DIFFERENT FROM BTN_DISABLED CAUSE THE BTN IS UPDATE IS REAL_TIME WITH WATCH TO PROVIDE ACCURATE INFO ABOUT ERRORS KEYS AND MSGS, CAN_MAKE_API IS MORE ABOUT PREVENTING API TO RUN FOR UNNECESSARY REASONS, LIKE IF I ALREADY SET ARGS OR ADD FIELDS TO ARGS BUT THEY ARE EMPTY STRINGS AND WOULD NOT CHANGE THE SQL QUERY TO GET DATA
      if (canMakeAPI && !hasFormErrs) {
        setArgs(currVals);
      } else {
        if (!canMakeAPI) setPreSubmit({ el: "canMakeAPI", val: true });
      }

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
  ]);
};
