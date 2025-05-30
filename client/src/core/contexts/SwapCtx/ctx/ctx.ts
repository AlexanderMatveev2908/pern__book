import { createContext, useContext, useReducer } from "react";
import { swapAddressInitState, SwapAddressStateType } from "./initState";
import { reducerSwap } from "./reducer";
import { SwapAddressActions } from "./actions";

export type AddressCtxType = {
  state: SwapAddressStateType;
  dispatch: React.ActionDispatch<[action: SwapAddressActions]>;
};

export const SwapCtx = createContext<AddressCtxType | null>(null);

export const useSwapCtxValsProducer = (): AddressCtxType => {
  const [state, dispatch] = useReducer(reducerSwap, swapAddressInitState);

  return {
    state,
    dispatch,
  };
};

export const useSwapCtxConsumer = (): AddressCtxType => {
  const ctx = useContext(SwapCtx);

  if (!ctx) throw new Error("Context must be consumed within a provider 😠");

  return ctx;
};
