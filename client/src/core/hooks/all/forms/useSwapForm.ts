/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeDelay, validateSwapper } from "@/core/lib/lib";
import { useCallback, useEffect } from "react";
import { FieldErrors, UseFormWatch } from "react-hook-form";
import { FormFieldBasic } from "@/types/types";
import {
  SwapAddressStateType,
  SwapModeType,
} from "@/core/contexts/SwapCtx/ctx/initState";
import {
  ActionsSwap,
  SwapAddressActions,
} from "@/core/contexts/SwapCtx/ctx/actions";

type Params = {
  state: SwapAddressStateType;
  dispatch: React.ActionDispatch<[action: SwapAddressActions]>;

  watch: UseFormWatch<any>;
  errors: FieldErrors;
  fields: FormFieldBasic[][];

  customSwapCB?: () => void;
  customValidateCB?: () => boolean;
};

export type ReturnSwapType = {
  setCurrForm: (val: number, swapMode?: SwapModeType | null) => void;
  setNextDisabled: (val: boolean) => void;
} & SwapAddressStateType;

export const useFormSwap = ({
  state,
  dispatch,
  watch,
  errors,
  fields,
  customSwapCB,
  customValidateCB,
}: Params): ReturnSwapType => {
  const { currForm, isNextDisabled } = state;

  const setCurrForm = useCallback(
    (val: number, swapMode: SwapModeType | null = SwapModeType.SWAPPED) => {
      if (typeof customSwapCB === "function") customSwapCB();

      dispatch({ type: ActionsSwap.SET_SWAP, payload: val });
      if (val < state.currForm)
        dispatch({ type: ActionsSwap.SET_NEXT_DISABLED, payload: false });

      makeDelay(() => {
        dispatch({
          type: ActionsSwap.SET_SWAP_STATE,
          payload: swapMode,
        });
      }, 500);
    },
    [customSwapCB, state.currForm, dispatch]
  );
  const setNextDisabled = useCallback(
    (val: boolean) =>
      dispatch({ type: ActionsSwap.SET_NEXT_DISABLED, payload: val }),
    [dispatch]
  );

  const vals = watch();

  useEffect(() => {
    const listen = () => {
      const { isValid, i } = validateSwapper({
        objErr: errors,
        fieldsByArea: fields,
        valsForm: vals,
      });

      // __cg("swapper", isValid, i, j);

      if (!isValid && i <= currForm && !isNextDisabled) setNextDisabled(true);
      else if ((isValid || currForm < i) && isNextDisabled)
        setNextDisabled(false);
    };

    listen();
  }, [
    vals,
    currForm,
    errors,
    isNextDisabled,
    setNextDisabled,
    fields,
    customValidateCB,
  ]);

  return {
    ...state,
    setCurrForm,
    setNextDisabled,
  };
};
