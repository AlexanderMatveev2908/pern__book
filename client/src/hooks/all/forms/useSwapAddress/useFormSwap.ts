/* eslint-disable @typescript-eslint/no-explicit-any */
import { __cg, validateSwapper } from "@/lib/lib";
import { useCallback, useEffect, useReducer } from "react";
import { FieldErrors, UseFormWatch } from "react-hook-form";
import { swapAddressInitState } from "./initState";
import { ActionsSwap } from "./actions";
import { reducerSwap } from "./reducer";
import { SwapFieldType } from "@/types/types";

type Params = {
  watch: UseFormWatch<any>;
  errors: FieldErrors;
  fields: SwapFieldType[][];
  customSwapCB?: () => void;
};

export const useFormSwap = ({
  watch,
  errors,
  fields,
  customSwapCB,
}: Params) => {
  const [state, dispatch] = useReducer(reducerSwap, swapAddressInitState);

  const { currForm, isNextDisabled, isFormOk } = state;

  const setCurrForm = useCallback(
    (val: number) => {
      if (typeof customSwapCB === "function") customSwapCB();

      dispatch({ type: ActionsSwap.SET_SWAP, payload: val });
      if (val < state.currForm)
        dispatch({ type: ActionsSwap.SET_NEXT_DISABLED, payload: false });
    },
    [customSwapCB, state.currForm]
  );
  const setNextDisabled = useCallback(
    (val: boolean) =>
      dispatch({ type: ActionsSwap.SET_NEXT_DISABLED, payload: val }),
    []
  );
  const setIsFormOk = useCallback(
    (val: boolean) =>
      dispatch({ type: ActionsSwap.SET_IS_FORM_OK, payload: val }),
    []
  );

  useEffect(() => {
    const sub = watch((valsForm) => {
      const { isValid, i, j } = validateSwapper({
        objErr: errors,
        fieldsByArea: fields,
        valsForm,
      });

      const len = Object.keys(errors).length;

      __cg("swapper", isValid, i, j);

      if (!isValid && i <= currForm && !isNextDisabled) setNextDisabled(true);
      else if ((isValid || currForm < i) && isNextDisabled)
        setNextDisabled(false);

      if (len && isFormOk) setIsFormOk(false);
      else if (!len && !isFormOk) setIsFormOk(true);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [
    watch,
    currForm,
    errors,
    isNextDisabled,
    setNextDisabled,
    isFormOk,
    setIsFormOk,
    fields,
  ]);

  return {
    ...state,
    setCurrForm,
    setNextDisabled,
    setIsFormOk,
  };
};
