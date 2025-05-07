import { useEffect, useState } from "react";

type Params<T> = {
  vals: T;
};

type ArgsType<T> = T & { _?: number };

export const useDebounce = <T>({ vals }: Params<T>) => {
  const [args, setArgs] = useState<ArgsType<T>>({} as ArgsType<T>);

  useEffect(() => {
    const handleVals = setTimeout(
      () => setArgs({ ...vals } as ArgsType<T>),
      500
    );

    return () => clearTimeout(handleVals);
  }, [vals]);

  return {
    args,
    setArgs,
  };
};
