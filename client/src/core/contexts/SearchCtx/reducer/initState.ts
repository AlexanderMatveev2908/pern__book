import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  ReqQueryAPI,
} from "@/types/types";
import { SearchStoreFormType } from "../../FormsCtx/hooks/useFormsCtxProvider";
import { setLimitCards } from "@/core/lib/lib";

export type ArgsSearchType = ReqQueryAPI<
  SearchStoreFormType | { a: "test" }
> | null;

export type SearchCtxStateType = {
  activeTxtInputs: FormFieldBasic[];
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
  isPending: {
    submit: boolean;
    clear: boolean;
  };
  preSubmit: {
    hasFormErrs: boolean;
    isPopulated: boolean;
    canMakeAPI: boolean;
    errNumbers: null | {
      currArr: NumericFilterSearch;
      currEl: FormFieldBasic;
    };
  };
};

export const initStateSearch: SearchCtxStateType = {
  activeTxtInputs: [],
  bars: {
    filterBar: false,
    sortBar: null,
  },
  searchers: {
    currFilter: null,
    currSorter: null,
  },
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
