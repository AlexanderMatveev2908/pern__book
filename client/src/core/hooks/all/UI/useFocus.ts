/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeDelay } from "@/core/lib/lib";
import { useEffect } from "react";
import { UseFormSetFocus } from "react-hook-form";

type Params = {
  key: string;
  setFocus: UseFormSetFocus<any>;
  delay?: number;
};

export const useFocus = ({ key, setFocus, delay }: Params) => {
  useEffect(() => {
    makeDelay(() => {
      setFocus(key);
    }, delay ?? 0);
  }, [setFocus, key, delay]);
};
