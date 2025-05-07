import { tailwindBreak } from "@/core/config/breakpoints";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  StorageKeys,
} from "@/types/types";
import { SearchStoreFormType } from "../../FormsCtx/hooks/useFormsCtxProvider";
import { getStorage } from "@/core/lib/lib";

export type ArgsSearchType = (SearchStoreFormType | { a: "test" }) & {
  _?: number;
};

const savedActiveLabels = getStorage(StorageKeys.SEARCH_BAR_STORES_OWNER);

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
};

export const initStateSearch: SearchCtxStateType = {
  labels: {
    labelSearch: window.innerWidth > tailwindBreak.sm,
    labelSubmit: window.innerWidth > tailwindBreak.lg,
  },
  activeTxtInputs: savedActiveLabels ? JSON.parse(savedActiveLabels) : [],
  bars: {
    filterBar: false,
    sortBar: false,
  },
  searchers: {
    currFilter: null,
    currSorter: null,
  },
  args: {},
};
