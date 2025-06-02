export enum SwapModeType {
  PENDING = "pending",
  SWAPPED = "swapped",
}

export interface SwapAddressStateType {
  currForm: number;
  isNextDisabled: boolean;
  currSwapState: SwapModeType | null;
}
export const swapAddressInitState: SwapAddressStateType = {
  isNextDisabled: true,
  currForm: 0,
  currSwapState: null,
};
