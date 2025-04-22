import { ActionsSwap, SwapAddressActions } from "./actions";
import { SwapAddressStateType } from "./initState";

export const reducerSwap = (
  state: SwapAddressStateType,
  action: SwapAddressActions
) => {
  switch (action.type) {
    case ActionsSwap.SET_SWAP:
      return { ...state, currForm: action.payload };
    case ActionsSwap.SET_NEXT_DISABLED:
      return { ...state, isNextDisabled: action.payload };
    case ActionsSwap.SET_IS_FORM_OK:
      return { ...state, isFormOk: action.payload };
    default:
      throw new Error(`Invalid action 😠: ${action} `);
  }
};
