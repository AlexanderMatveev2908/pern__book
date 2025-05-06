import { SearchCtxActions, SearchCtxActionsType } from "./actions";
import { SearchCtxStateType } from "./initState";

export const reducerSearch = (
  state: SearchCtxStateType,
  action: SearchCtxActionsType
): SearchCtxStateType => {
  switch (action.type) {
    case SearchCtxActions.SET_LABEL: {
      const { label, val } = action.payload;

      return {
        ...state,
        labels: {
          ...state.labels,
          [label]: val,
        },
      };
    }

    case SearchCtxActions.SET_TXT_INPUTS:
      return {
        ...state,
        activeTxtInputs: action.payload,
      };

    default:
      throw new Error("Invalid action " + (action as any)?.type);
  }
};
