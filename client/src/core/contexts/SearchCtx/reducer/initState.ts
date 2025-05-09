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
  labels: {
    labelSubmit: boolean;
    labelSearch: boolean;
  };
  activeTxtInputs: FormFieldBasic[];
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
  isBtnDisabled: boolean;
  isPopulated: boolean;
  canMakeAPI: boolean;
  pagination: {
    block: number;
    page: number;
    limit: number;
  };
  errNumbers: null | {
    currArr: NumericFilterSearch;
    currEl: FormFieldBasic;
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
  isBtnDisabled: false,
  isPopulated: false,
  canMakeAPI: true,
  pagination: {
    block: 0,
    limit: setLimitCards(),
    page: 0,
  },
  errNumbers: null,
};
