export interface SwapAddressStateType {
  isFormOk: boolean;
  currForm: number;
  isNextDisabled: boolean;
}
export const swapAddressInitState: SwapAddressStateType = {
  isFormOk: true,
  isNextDisabled: true,
  currForm: 0,
};
