/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsSearchType } from "@/core/contexts/SearchCtx/reducer/initState";
import { clearTimer, saveStorage } from "@/core/lib/lib";
import { StorageKeys } from "@/types/types";
import { useEffect, useRef } from "react";
import { UseFormGetValues } from "react-hook-form";

type Params = {
  getValues: UseFormGetValues<any>;
  setArgs: (vals: ArgsSearchType) => void;
  keyStorage: StorageKeys;
  vals: ArgsSearchType;
};

export const useDebounce = ({
  getValues,
  keyStorage,
  setArgs,
  vals,
}: Params) => {
  const timerID = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      const vals = getValues();
      setArgs({ ...vals });
      saveStorage({ key: keyStorage, data: vals });
      clearTimer(timerID);
    }, 400);

    return () => clearTimer(timerID);
  }, [getValues, keyStorage, setArgs, vals]);
};
