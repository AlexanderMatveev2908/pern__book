import { FilterSearch, FormFieldBasic } from "@/types/types";

export enum SearchCtxActions {
  SET_LABEL = "SET_LABEL",
  SET_TXT_INPUTS = "SET_TXT_INPUTS",
  SET_BAR = "SET_BAR",
  SET_SEARCH = "SET_SEARCH",
}

export type ParamsBar = {
  el: "filterBar" | "sortBar";
  val: boolean;
};
export type ParamsSearch = {
  el: "currFilter" | "currSorter";
  val: FilterSearch;
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
    };
