import { getKeysSearchBar } from "@/core/lib/lib";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useGetSearchKeysStorage = () => {
  const path = useLocation().pathname;

  const keys = useMemo(() => getKeysSearchBar(path), [path]);

  return {
    ...keys,
  };
};
