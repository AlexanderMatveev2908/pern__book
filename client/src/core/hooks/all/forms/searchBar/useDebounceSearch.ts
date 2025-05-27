/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { FieldValues, UseFormGetValues } from "react-hook-form";
import {
  clearTimer,
  cpyObj,
  getDefValsPagination,
  isSameData,
  isStr,
  saveStorage,
} from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { REG_ID } from "@/core/config/regex";

type Params<T extends FieldValues> = {
  txtInputs?: FormFieldBasic[];
  realTimeVals: T;
  ctx: SearchCtxValsConsumer;
  getValues: UseFormGetValues<T>;
  triggerRtk: any;
  routeID?: string;
};

export const useDebounceSearch = ({
  txtInputs,
  ctx,
  realTimeVals,
  getValues,
  triggerRtk,
  routeID,
}: Params<any>) => {
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const {
    oldVals,
    preSubmit: { canMakeAPI, isPopulated, hasFormErrs },
    setPreSubmit,
    pagination: { limit },
  } = ctx;

  const { keyStorage } = useGetSearchKeysStorage();

  useEffect(() => {
    timerID.current = setTimeout(() => {
      if (!isPopulated) return;
      if (isStr(routeID) && !REG_ID.test(routeID ?? "")) return;

      // ⚠️ DO NOT CREATE JUST A SHALLOW COPY — GET_VALUES RETURN A NESTED OBJ
      // A SHALLOW SPREAD LIKE `{ ...GET_VALUES() }` WON’T BREAK INTERNAL REFERENCES TO REACT-HOOK-FORM’S PROXIES.
      // YOU'LL GET THIS ERROR IF YOU TRY TO MUTATE LATER:
      // ❌ TYPEERROR: CANNOT ASSIGN TO READ ONLY PROPERTY '0' OF OBJECT '[OBJECT ARRAY]'
      //    AT SET.TS:35
      // REACT-HOOK-FORM (AND REACT IN GENERAL) PROTECTS INTERNAL STATE BY FREEZING OR PROXYING IT.

      const currVals = cpyObj({
        ...getValues(),
        ...getDefValsPagination(0, limit),
      });

      if (currVals === oldVals.current)
        throw new Error("memory err debounce 😡");

      const isSame: boolean = isSameData(oldVals.current, currVals);

      // __cg("comparison", oldVals.current, currVals, isSame);

      if (isSame) {
        if (!canMakeAPI) setPreSubmit({ el: "canMakeAPI", val: true });
        clearTimer(timerID);
        return;
      }

      oldVals.current = currVals;
      saveStorage({
        key: keyStorage as any,
        data: currVals,
      });

      // ? IS DIFFERENT FROM BTN_DISABLED CAUSE THE BTN IS UPDATE IS REAL_TIME WITH WATCH TO PROVIDE ACCURATE INFO ABOUT ERRORS KEYS AND MSGS, CAN_MAKE_API IS MORE ABOUT PREVENTING API TO RUN FOR UNNECESSARY REASONS, LIKE IF I ALREADY SET ARGS OR ADD FIELDS TO ARGS BUT THEY ARE EMPTY STRINGS AND WOULD NOT CHANGE THE SQL QUERY TO GET DATA
      if (canMakeAPI && !hasFormErrs) triggerRtk({ vals: currVals, routeID });
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
    keyStorage,
    triggerRtk,
    routeID,
    realTimeVals,
    canMakeAPI,
    isPopulated,
    setPreSubmit,
    oldVals,
    limit,
  ]);
};
