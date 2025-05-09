import { useEffect, useRef } from "react";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { useFormContext } from "react-hook-form";
import { __cg, clearTimer, isSameData, saveStorage } from "@/core/lib/lib";
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
    isPopulated,
    setPopulated,
    pagination: { page, limit, block },
    canMakeAPI,
    setArgs,
    setCanMakeAPI,
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
          setPopulated(true);
        }

        clearTimer(timerID);
        return null;
      }

      oldVals.current = currVals as ArgsSearchType;
      saveStorage({
        key: keyStorageVals,
        data: { ...currVals, page, block },
      });

      if (canMakeAPI) {
        __cg("allowed vals", currVals);

        setArgs({
          ...(currVals as ArgsSearchType),
          page,
          limit,
          _: Date.now(),
        });
      } else {
        setCanMakeAPI(true);
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
    setCanMakeAPI,
    setPopulated,
    isPopulated,
    page,
  ]);
};
