/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeDelay } from "@/lib/lib";
import { useEffect } from "react";
import { UseFormSetFocus } from "react-hook-form";

type Params = {
  key: string;
  setFocus: UseFormSetFocus<any>;
};

export const useFocus = ({ key, setFocus }: Params) => {
  useEffect(() => {
    makeDelay(() => {
      setFocus(key);
    }, 750);
  }, [setFocus, key]);
};
