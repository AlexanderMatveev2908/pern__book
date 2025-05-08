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
    };
