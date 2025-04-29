/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { UseFormSetFocus } from "react-hook-form";
import { SwapModeType } from "../forms/useSwapAddress/initState";

type Params = {
  setFocus: UseFormSetFocus<any>;
  currSwapState: SwapModeType | null;
  currForm: number;
};

export const useFocusAddress = ({
  setFocus,
  currSwapState,
  currForm,
}: Params) => {
  useEffect(() => {
    const handleSwapUI = () => {
      if (currSwapState !== SwapModeType.SWAPPED) return;

      if (!currForm) setFocus("country");
      else if (currForm) setFocus("street");
    };

    handleSwapUI();
  }, [currForm, currSwapState, setFocus]);
  return {};
};
