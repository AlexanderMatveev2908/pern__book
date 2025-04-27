/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeDelay, validateSwapper } from "@/lib/lib";
import { useCallback, useEffect, useReducer } from "react";
import { FieldErrors, UseFormWatch } from "react-hook-form";
import { swapAddressInitState, SwapModeType } from "./initState";
import { ActionsSwap } from "./actions";
import { reducerSwap } from "./reducer";
import { SwapFieldType } from "@/types/types";

type Params = {
  watch: UseFormWatch<any>;
  errors: FieldErrors;
  fields: SwapFieldType[][];
  customSwapCB?: () => void;
  customValidateCB?: () => boolean;
};

export const useFormSwap = ({
  watch,
  errors,
  fields,
  customSwapCB,
  customValidateCB,
}: Params) => {
  const [state, dispatch] = useReducer(reducerSwap, swapAddressInitState);

  const { currForm, isNextDisabled, isFormOk, currSwapState } = state;

  const setCurrForm = useCallback(
    (val: number, swapState: SwapModeType | null = SwapModeType.SWAPPED) => {
      if (typeof customSwapCB === "function") customSwapCB();

      dispatch({ type: ActionsSwap.SET_SWAP, payload: val });
      if (val < state.currForm)
        dispatch({ type: ActionsSwap.SET_NEXT_DISABLED, payload: false });

      makeDelay(() => {
        dispatch({
          type: ActionsSwap.SET_SWAP_STATE,
          payload: swapState,
        });
      }, 500);
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

  const vals = watch();

  useEffect(() => {
    const listen = () => {
      const { isValid, i } = validateSwapper({
        objErr: errors,
        fieldsByArea: fields,
        valsForm: vals,
      });

      const len = Object.keys(errors).length;
      const makeMakeAPI =
        typeof customValidateCB === "function" ? customValidateCB() : true;

      // __cg("swapper", isValid, i, j);

      if (!isValid && i <= currForm && !isNextDisabled) setNextDisabled(true);
      else if ((isValid || currForm < i) && isNextDisabled)
        setNextDisabled(false);

      if ((len || !makeMakeAPI) && isFormOk) setIsFormOk(false);
      else if (!len && makeMakeAPI && !isFormOk) setIsFormOk(true);
    };
    listen();
  }, [
    vals,
    currForm,
    errors,
    isNextDisabled,
    setNextDisabled,
    isFormOk,
    setIsFormOk,
    fields,
    customValidateCB,
  ]);

  return {
    ...state,
    setCurrForm,
    setNextDisabled,
    setIsFormOk,
    currSwapState,
  };
};
