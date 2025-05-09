import { useEffect, useRef } from "react";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { useFormContext } from "react-hook-form";
import { clearTimer, isSameData, saveStorage } from "@/core/lib/lib";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FormFieldBasic } from "@/types/types";
import { ArgsSearchType } from "@/core/contexts/SearchCtx/reducer/initState";

type Params = {
  txtInputs: FormFieldBasic[];
};

export const useDebounceSearch = ({ txtInputs }: Params) => {
  const oldVals = useRef<ArgsSearchType | null>(null);
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const {
    pagination: { page, limit, block },
    setArgs,
    preSubmit: { canMakeAPI, isPopulated },
    setPreSubmit,
  } = useSearchCtx();
  const { keyStorageVals } = useGetSearchKeysStorage();

  const { getValues, watch } = useFormContext();
  const vals = watch();

  useEffect(() => {
    timerID.current = setTimeout(() => {
      const currVals = getValues();
      const isSame: boolean = isSameData(oldVals.current, currVals);

      // __cg("old", oldVals.current);
      // __cg("new", vals);
      // __cg("same", isSame);

      if (isSame) {
        if (!isPopulated) {
          oldVals.current = {
            ...currVals,
            [txtInputs[0].field]: currVals[txtInputs[0].field] || "",
          };
          setPreSubmit({ el: "isPopulated", val: true });
        }

        clearTimer(timerID);
        return null;
      }

      oldVals.current = currVals as ArgsSearchType;
      saveStorage({
        key: keyStorageVals,
        data: { ...currVals, page, block },
      });

      // ? IS DIFFERENT FROM BTN_DISABLED CAUSE THE BTN IS UPDATE IS REAL_TIME WITH WATCH TO PROVIDE ACCURATE INFO ABOUT ERRORS KEYS AND MSGS, CAN_MAKE_API IS MORE ABOUT PREVENTING API TO RUN FOR UNNECESSARY REASONS, LIKE IF I ALREADY SET ARGS OR ADD FIELDS TO ARGS BUT THEY ARE EMPTY STRINGS AND WOULD NOT CHANGE THE SQL QUERY TO GET DATA
      if (canMakeAPI) {
        setArgs({
          ...(currVals as ArgsSearchType),
          page,
          limit,
        });
      } else {
        setPreSubmit({ el: "canMakeAPI", val: true });
      }

      clearTimer(timerID);
    }, 500);

    return () => {
      clearTimer(timerID);
    };
  }, [
    txtInputs,
    block,
    limit,
    getValues,
    keyStorageVals,
    setArgs,
    vals,
    canMakeAPI,
    isPopulated,
    page,
    setPreSubmit,
  ]);
};
