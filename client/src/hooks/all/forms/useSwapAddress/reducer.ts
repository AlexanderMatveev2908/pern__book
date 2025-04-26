import { ActionsSwap, SwapAddressActions } from "./actions";
import { SwapAddressStateType, SwapModeType } from "./initState";

export const reducerSwap = (
  state: SwapAddressStateType,
  action: SwapAddressActions
) => {
  switch (action.type) {
    case ActionsSwap.SET_SWAP:
      return {
        ...state,
        currForm: action.payload,
        currSwapState: SwapModeType.PENDING,
      };
    case ActionsSwap.SET_NEXT_DISABLED:
      return {
        ...state,
        isNextDisabled: action.payload,
      };
    case ActionsSwap.SET_IS_FORM_OK:
      return {
        ...state,
        isFormOk: action.payload,
      };
    case ActionsSwap.SET_SWAP_STATE:
      return {
        ...state,
        currSwapState: action.payload,
      };
    default:
      throw new Error(`Invalid action 😠: ${action} `);
  }
};
