import { useCallback, useEffect, useRef, useState } from "react";

export const useFakeLoading = () => {
  const [isFakePending, setIsFakePending] = useState(false);
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const handleTimer = useCallback(() => {
    setIsFakePending(true);
  }, []);

  useEffect(() => {
    if (isFakePending)
      timerID.current = setTimeout(() => {
        setIsFakePending(false);
        clearTimeout(timerID.current as NodeJS.Timeout);
        timerID.current = null;
      }, 2500);
  }, [isFakePending]);

  return {
    handleTimer,
    isFakePending,
  };
};
