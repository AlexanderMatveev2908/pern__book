import {
  ActionsSwap,
  SwapAddressActions,
} from "@/core/contexts/SwapCtx/ctx/actions";
import {
  SwapAddressStateType,
  SwapModeType,
} from "@/core/contexts/SwapCtx/ctx/initState";
import { makeDelay } from "@/core/lib/lib";
import { useCallback } from "react";

type Params = {
  state: SwapAddressStateType;
  dispatch: React.ActionDispatch<[action: SwapAddressActions]>;

  customSwapCB?: () => void;
  customValidateCB?: () => boolean;
};

export const usePartialSwap = ({ state, dispatch, customSwapCB }: Params) => {
  const setCurrForm = useCallback(
    (val: number, swapMode: SwapModeType | null = SwapModeType.SWAPPED) => {
      // ? pass null to avoid focus if u do not want to
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
  return {
    setCurrForm,
  };
};
