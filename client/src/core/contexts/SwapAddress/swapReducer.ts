import { ActionsSwap, SwapAddressActions } from "./actions";
import { SwapAddressStateType } from "./initState";

export const swapReducer = (
  state: SwapAddressStateType,
  action: SwapAddressActions
) => {
  switch (action.type) {
    case ActionsSwap.SET_NEXT_DISABLED:
      return {
        ...state,
        isNextDisabled: action.payload,
      };
    case ActionsSwap.SET_SWAP:
      return {
        ...state,
        currForm: action.payload,
      };
    default:
      throw new Error("Invalid action " + action);
  }
};
