export enum ActionsSwap {
  SET_SWAP = "SET_SWAP",
  SET_NEXT_DISABLED = "SET_NEXT_DISABLED",
  SET_IS_FORM_OK = "SET_IS_FORM_OK",
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
    };
