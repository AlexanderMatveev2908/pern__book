/* eslint-disable @typescript-eslint/no-explicit-any */
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

    case SearchCtxActions.SET_BAR: {
      const { el, val } = action.payload;

      return {
        ...state,
        bars: {
          ...state.bars,
          [el]: val,
        },
      };
    }

    case SearchCtxActions.SET_SEARCH: {
      const { el, val } = action.payload;

      return {
        ...state,
        searchers: {
          ...state.searchers,
          [el]: val,
        },
      };
    }

    case SearchCtxActions.SET_ARGS:
      return {
        ...state,
        args: action.payload,
      };

    case SearchCtxActions.SET_IS_PENDING: {
      const { el, val } = action.payload;

      return {
        ...state,
        isPending: {
          ...state.isPending,
          [el]: val,
        },
      };
    }

    case SearchCtxActions.SET_BTN_DISABLED:
      return {
        ...state,
        isBtnDisabled: action.payload,
      };

    case SearchCtxActions.SET_POPULATED:
      return {
        ...state,
        isPopulated: action.payload,
      };

    case SearchCtxActions.SET_CAN_MAKE_API:
      return {
        ...state,
        canMakeAPI: action.payload,
      };

    case SearchCtxActions.SET_PAGINATION: {
      const { el, val } = action.payload;

      return {
        ...state,
        pagination: {
          ...state.pagination,
          [el]: val,
        },
      };
    }

    default:
      throw new Error("Invalid action " + (action as any)?.type);
  }
};
