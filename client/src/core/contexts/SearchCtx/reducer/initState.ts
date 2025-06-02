import { FilterSearch, NumericFilterSearch, ReqQueryAPI } from "@/types/types";
import { SearchStoreFormType } from "../../FormsCtx/hooks/useFormsCtxProvider";
import { setLimitCards } from "@/core/lib/lib";
import { ParamsErrNumber } from "./actions";

export type ArgsSearchType = ReqQueryAPI<
  SearchStoreFormType | { a: "test" }
> | null;

export type FieldJoinCatType = {
  val: string;
  label: string;
};

export type SearchCtxStateType = {
  // activeTxtInputs: FormFieldBasic[];
  bars: {
    filterBar: boolean;
    sortBar: boolean | null;
  };
  pagination: {
    page: number;
    limit: number;
  };
  searchers: {
    currFilter: FilterSearch | NumericFilterSearch | null;
    currSorter: FilterSearch | null;
  };
  innerJoinedCatCtx: FieldJoinCatType[];
  isPending: {
    submit: boolean;
    clear: boolean;
  };
  preSubmit: {
    hasFormErrs: boolean;
    isPopulated: boolean;
    canMakeAPI: boolean;
    errNumbers: ParamsErrNumber;
  };
};

export const initStateSearch: SearchCtxStateType = {
  // activeTxtInputs: [],
  bars: {
    filterBar: false,
    sortBar: null,
  },
  searchers: {
    currFilter: null,
    currSorter: null,
  },
  innerJoinedCatCtx: [],
  isPending: {
    submit: false,
    clear: false,
  },
  pagination: {
    page: 0,
    limit: setLimitCards(),
  },
  preSubmit: {
    hasFormErrs: false,
    isPopulated: false,
    // isFormStable: false,
    canMakeAPI: true,
    errNumbers: null,
  },
};
