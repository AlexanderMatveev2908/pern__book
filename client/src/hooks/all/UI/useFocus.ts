/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { UseFormSetFocus } from "react-hook-form";

type Params = {
  key: string;
  setFocus: UseFormSetFocus<any>;
};

export const useFocus = ({ key, setFocus }: Params) => {
  useEffect(() => {
    setFocus(key);
  }, [setFocus, key]);
};
