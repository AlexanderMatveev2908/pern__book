import { tailwindBreak } from "@/core/config/breakpoints";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  ReqQueryAPI,
} from "@/types/types";
import { SearchStoreFormType } from "../../FormsCtx/hooks/useFormsCtxProvider";

export type ArgsSearchType = ReqQueryAPI<
  SearchStoreFormType | { a: "test" }
> | null;

export type SearchCtxStateType = {
  activeTxtInputs: FormFieldBasic[];
  // ? LABELS JUST UI NOT APP LOGIC, COULD VOID PUT IN CTX WITH CUSTOM HOOK
  labels: {
    labelSubmit: boolean;
    labelSearch: boolean;
  };
  bars: {
    filterBar: boolean;
    sortBar: boolean;
  };
  searchers: {
    currFilter: FilterSearch | NumericFilterSearch | null;
    currSorter: FilterSearch | null;
  };
  args: ArgsSearchType;
  isPending: {
    submit: boolean;
    clear: boolean;
  };
  preSubmit: {
    hasFormErrs: boolean;
    isPopulated: boolean;
    canMakeAPI: boolean;
    isFormStable: boolean;
    errNumbers: null | {
      currArr: NumericFilterSearch;
      currEl: FormFieldBasic;
    };
  };
};

export const initStateSearch: SearchCtxStateType = {
  labels: {
    labelSearch: window.innerWidth > tailwindBreak.sm,
    labelSubmit: window.innerWidth > tailwindBreak.lg,
  },
  activeTxtInputs: [],
  bars: {
    filterBar: false,
    sortBar: false,
  },
  searchers: {
    currFilter: null,
    currSorter: null,
  },
  args: null,
  isPending: {
    submit: false,
    clear: false,
  },
  preSubmit: {
    hasFormErrs: false,
    isPopulated: false,
    isFormStable: false,
    canMakeAPI: true,
    errNumbers: null,
  },
};
