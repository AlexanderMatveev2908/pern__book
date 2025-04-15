// import { addFlagCB } from "@/lib/lib";
import { useCallback } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useCb = ({ cb, alias }: { cb: () => any; alias: string }) => {
  // const cbMemoized = useCallback(() => addFlagCB(cb), [cb]);
  const cbMemoized = useCallback(() => cb(), [cb]);

  return {
    [`${alias}Cb`]: cbMemoized,
  };
};
