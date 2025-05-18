import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { FieldJoinCatType } from "./initState";

export enum SearchCtxActions {
  SET_BAR = "SET_BAR",
  SET_SEARCH = "SET_SEARCH",
  SET_IS_PENDING = "SET_IS_PENDING",
  SET_PRE_SUBMIT = "SET_PRE_SUBMIT",
  SET_PAGINATION = "SET_PAGINATION",
  SET_INNER_JOINED_CAT = "SET_INNER_JOINED_CAT",
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
  el: "hasFormErrs" | "isPopulated" | "canMakeAPI" | "errNumbers";
  val:
    | boolean
    | null
    | {
        currArr: NumericFilterSearch;
        currEl: FormFieldBasic;
      };
};

export type ParamsPage = {
  el: "page" | "limit";
  val: number;
};

export type SearchCtxActionsType =
  | {
      type: SearchCtxActions.SET_BAR;
      payload: ParamsBar;
    }
  | {
      type: SearchCtxActions.SET_SEARCH;
      payload: ParamsSearch;
    }
  | {
      type: SearchCtxActions.SET_IS_PENDING;
      payload: ParamsPending;
    }
  | {
      type: SearchCtxActions.SET_PRE_SUBMIT;
      payload: ParamsPreSubmit;
    }
  | {
      type: SearchCtxActions.SET_PAGINATION;
      payload: ParamsPage;
    }
  | {
      type: SearchCtxActions.SET_INNER_JOINED_CAT;
      payload: FieldJoinCatType[];
    };
