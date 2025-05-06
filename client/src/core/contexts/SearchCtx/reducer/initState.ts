import { tailwindBreak } from "@/core/config/breakpoints";
import { FiltersSearch, FormFieldBasic } from "@/types/types";

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
    currFilter: FiltersSearch | null;
    currSorter: FiltersSearch | null;
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
};
