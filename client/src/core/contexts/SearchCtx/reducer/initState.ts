import { tailwindBreak } from "@/core/config/breakpoints";
import { FormFieldBasic } from "@/types/types";

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
};

export const initStateSearch: SearchCtxStateType = {
  labels: {
    labelSearch: window.innerWidth > tailwindBreak.sm,
    labelSubmit: window.innerWidth > 450,
  },
  activeTxtInputs: [],
  bars: {
    filterBar: false,
    sortBar: false,
  },
};
