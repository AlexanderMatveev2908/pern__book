import { useEffect } from "react";

type Params = {
  cb: () => void;
  cond: boolean;
};

export const useFocusBySwap = ({ cb, cond }: Params) => {
  useEffect(() => {
    if (cond) cb();
    // eslint-disable-next-line
  }, [cond]);
};
