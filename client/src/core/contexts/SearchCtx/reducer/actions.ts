import { FormFieldBasic } from "@/types/types";

export enum SearchCtxActions {
  SET_LABEL = "SET_LABEL",
  SET_TXT_INPUTS = "SET_TXT_INPUTS",
  SET_BAR = "SET_BAR",
}

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
      payload: { val: boolean; el: "filterBar" | "sortBar" };
    };
