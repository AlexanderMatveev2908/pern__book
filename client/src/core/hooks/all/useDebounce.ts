import { saveStorage } from "@/core/lib/lib";
import { StorageKeys } from "@/types/types";
import { useEffect, useState } from "react";

type Params<T> = {
  vals: T;
  keyStorage: StorageKeys;
};

type ArgsType<T> = T & { _?: number };

export const useDebounce = <T>({ vals, keyStorage }: Params<T>) => {
  const [args, setArgs] = useState<ArgsType<T>>({} as ArgsType<T>);

  useEffect(() => {
    const handleVals = setTimeout(() => {
      setArgs({ ...vals } as ArgsType<T>);
      saveStorage({ key: keyStorage, data: vals });
    }, 400);

    return () => clearTimeout(handleVals);
  }, [vals, keyStorage]);

  return {
    args,
    setArgs,
  };
};
