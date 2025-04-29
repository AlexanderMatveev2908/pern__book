export enum ActionsSwap {
  SET_SWAP = "SET_SWAP",
  SET_NEXT_DISABLED = "SET_NEXT_DISABLED",
}

export type SwapAddressActions =
  | {
      type: ActionsSwap.SET_SWAP;
      payload: number;
    }
  | {
      type: ActionsSwap.SET_NEXT_DISABLED;
      payload: boolean;
    };
