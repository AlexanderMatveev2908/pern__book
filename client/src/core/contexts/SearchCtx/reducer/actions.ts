import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { ArgsSearchType } from "./initState";

export enum SearchCtxActions {
  SET_LABEL = "SET_LABEL",
  SET_TXT_INPUTS = "SET_TXT_INPUTS",
  SET_BAR = "SET_BAR",
  SET_SEARCH = "SET_SEARCH",
  SET_ARGS = "SET_ARGS",
  SET_IS_PENDING = "SET_IS_PENDING",
  SET_PAGINATION = "SET_PAGINATION",
  SET_PRE_SUBMIT = "SET_PRE_SUBMIT",
}

export type ParamsBar = {
  el: "filterBar" | "sortBar";
  val: boolean;
};
export type ParamsSearch = {
  el: "currFilter" | "currSorter";
  val: FilterSearch | NumericFilterSearch;
};
export type ParamsPending = {
  el: "submit" | "clear";
  val: boolean;
};

export type ParamsPagination = {
  el: "limit" | "page" | "block";
  val: number;
};

export type ParamsErrNumber = null | {
  currArr: NumericFilterSearch;
  currEl: FormFieldBasic;
};

export type ParamsPreSubmit = {
  el:
    | "hasFormErrs"
    | "isPopulated"
    | "hasPagination"
    | "canMakeAPI"
    | "errNumbers";
  val:
    | boolean
    | null
    | {
        currArr: NumericFilterSearch;
        currEl: FormFieldBasic;
      };
};

export type SearchCtxActionsType =
  | {
      type: SearchCtxActions.SET_LABEL;
      payload: { val: boolean; label: "labelSubmit" | "labelSearch" };
    }
  | {
      type: SearchCtxActions.SET_TXT_INPUTS;
      payload: FormFieldBasic[];
    }
  | {
      type: SearchCtxActions.SET_BAR;
      payload: ParamsBar;
    }
  | {
      type: SearchCtxActions.SET_SEARCH;
      payload: ParamsSearch;
    }
  | {
      type: SearchCtxActions.SET_ARGS;
      payload: ArgsSearchType;
    }
  | {
      type: SearchCtxActions.SET_IS_PENDING;
      payload: ParamsPending;
    }
  | {
      type: SearchCtxActions.SET_PAGINATION;
      payload: ParamsPagination;
    }
  | {
      type: SearchCtxActions.SET_PRE_SUBMIT;
      payload: ParamsPreSubmit;
    };
