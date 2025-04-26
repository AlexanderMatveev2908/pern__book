import { SwapModeType } from "./initState";

export enum ActionsSwap {
  SET_SWAP = "SET_SWAP",
  SET_NEXT_DISABLED = "SET_NEXT_DISABLED",
  SET_IS_FORM_OK = "SET_IS_FORM_OK",
  SET_SWAP_STATE = "SET_SWAP_STATE",
}

export type SwapAddressActions =
  | {
      type: ActionsSwap.SET_SWAP;
      payload: number;
    }
  | {
      type: ActionsSwap.SET_NEXT_DISABLED;
      payload: boolean;
    }
  | {
      type: ActionsSwap.SET_IS_FORM_OK;
      payload: boolean;
    }
  | {
      type: ActionsSwap.SET_SWAP_STATE;
      payload: SwapModeType | null;
    };
