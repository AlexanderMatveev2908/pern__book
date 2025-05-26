import { formatP } from "@/core/lib/lib";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useGetSearchKeysStorage = () => {
  const path = useLocation().pathname;

  const keyStorage = useMemo(() => formatP(path), [path]);

  return {
    keyStorage,
  };
};
