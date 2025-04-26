export enum SwapModeType {
  PENDING = "pending",
  SWAPPED = "swapped",
}

export interface SwapAddressStateType {
  isFormOk: boolean;
  currForm: number;
  isNextDisabled: boolean;
  currSwapState: SwapModeType | null;
}
export const swapAddressInitState: SwapAddressStateType = {
  isFormOk: true,
  isNextDisabled: true,
  currForm: 0,
  currSwapState: null,
};
