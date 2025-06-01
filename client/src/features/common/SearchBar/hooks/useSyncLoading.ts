import { useEffect } from "react";

type Params = {
  isFetching?: boolean;
  isPendingCustom: boolean;
  setIsPending: (val: boolean) => void;
};

export const useSyncLoading = ({
  isFetching,
  isPendingCustom,
  setIsPending,
}: Params) => {
  useEffect(() => {
    if (isPendingCustom && !isFetching) setIsPending(false);
    // __cg("real", isFetching);
    // __cg("custom", isPendingCustom);
  }, [isPendingCustom, isFetching, setIsPending]);
};
