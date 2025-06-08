/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateSwapper } from "@/core/lib/lib";
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
import { usePartialSwap } from "./usePartialSwap";

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

  const { setCurrForm } = usePartialSwap({ state, dispatch, customSwapCB });

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
