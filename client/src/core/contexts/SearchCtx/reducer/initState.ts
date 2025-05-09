import { tailwindBreak } from "@/core/config/breakpoints";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { SearchStoreFormType } from "../../FormsCtx/hooks/useFormsCtxProvider";
import { setLimitCards } from "@/core/lib/lib";

export type ArgsSearchType = (SearchStoreFormType | { a: "test" }) & {
  _?: number;
  page?: number;
  limit?: number;
};

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
    hasPagination: boolean;
    canMakeAPI: boolean;
    errNumbers: null | {
      currArr: NumericFilterSearch;
      currEl: FormFieldBasic;
    };
  };
  pagination: {
    block: number;
    page: number;
    limit: number;
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
  args: {},
  isPending: {
    submit: false,
    clear: false,
  },
  preSubmit: {
    hasFormErrs: false,
    isPopulated: false,
    hasPagination: false,
    canMakeAPI: true,
    errNumbers: null,
  },
  pagination: {
    block: 0,
    limit: setLimitCards(),
    page: 0,
  },
};
