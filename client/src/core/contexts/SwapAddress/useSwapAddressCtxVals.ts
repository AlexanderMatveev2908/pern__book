// import { useCallback, useReducer } from "react";
// import { swapReducer } from "./swapReducer";
// import { swapAddressInitState, SwapAddressStateType } from "./initState";
// import { ActionsSwap } from "./actions";

// export type SwapCtxValsType = {
//   setCurrForm: (val: number) => void;
//   setNextDisabled: (val: boolean) => void;
// } & SwapAddressStateType;

// export const useSwapAddressCtxVals = () => {
//   const [state, dispatch] = useReducer(swapReducer, swapAddressInitState);

//   const setCurrForm = useCallback(
//     (val: number) => dispatch({ type: ActionsSwap.SET_SWAP, payload: val }),
//     []
//   );

//   const setNextDisabled = useCallback(
//     (val: boolean) =>
//       dispatch({ type: ActionsSwap.SET_NEXT_DISABLED, payload: val }),
//     []
//   );

//   return {
//     ...state,
//     setCurrForm,
//     setNextDisabled,
//   };
// };
