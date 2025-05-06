import { FormFieldBasic } from "@/types/types";

export enum SearchCtxActions {
  SET_LABEL = "SET_LABEL",
  SET_TXT_INPUTS = "SET_TXT_INPUTS",
  SET_FIXED = "SET_FIXED",
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
      type: SearchCtxActions.SET_FIXED;
      payload: { val: boolean; el: "footerBar" | "sortBar" };
    };
