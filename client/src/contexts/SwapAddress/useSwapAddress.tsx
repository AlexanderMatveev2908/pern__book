import { useReducer } from "react";
import { swapReducer } from "./swapReducer";
import { swapAddressInitState, SwapAddressStateType } from "./initState";
import { ActionsSwap } from "./actions";

export type SwapCtxValsType = {
  setCurrForm: (val: number) => void;
} & SwapAddressStateType;

export const useSwapAddress = () => {
  const [state, dispatch] = useReducer(swapReducer, swapAddressInitState);

  const setCurrForm = (val: number) =>
    dispatch({ type: ActionsSwap.SET_SWAP, payload: val });

  return {
    ...state,
    setCurrForm,
  };
};
