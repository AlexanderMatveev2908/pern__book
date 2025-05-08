/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsSearchType } from "@/core/contexts/SearchCtx/reducer/initState";
import { clearTimer, isSameData, saveStorage } from "@/core/lib/lib";
import { StorageKeys } from "@/types/types";
import { useEffect, useRef } from "react";
import { UseFormGetValues, UseFormWatch } from "react-hook-form";

type Params = {
  getValues: UseFormGetValues<any>;
  setArgs: (vals: ArgsSearchType) => void;
  keyStorage: StorageKeys;
  watch: UseFormWatch<any>;
};

export const useDebounce = ({
  getValues,
  keyStorage,
  setArgs,
  watch,
}: Params) => {
  const realTimeVals = watch();
  const oldVals = useRef<ArgsSearchType>(getValues());
  const timerID = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      const currVals = getValues();
      const isSame: boolean = isSameData(oldVals.current, currVals);

      // __cg("old", oldVals.current);
      // __cg("new", currVals);
      // __cg("same", isSame);

      if (isSame) {
        clearTimer(timerID);
        return null;
      }

      oldVals.current = currVals;
      setArgs({ ...currVals });
      saveStorage({ key: keyStorage, data: currVals });
      clearTimer(timerID);
    }, 500);

    return () => {
      clearTimer(timerID);
    };
  }, [getValues, keyStorage, setArgs, realTimeVals]);
};
