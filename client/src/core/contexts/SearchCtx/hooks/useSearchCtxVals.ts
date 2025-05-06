import { useCallback, useEffect } from "react";
import { SearchCtxActions, SearchCtxActionsType } from "../reducer/actions";
import { SearchCtxStateType } from "../reducer/initState";
import { tailwindBreak } from "@/core/config/breakpoints";
import { FormFieldBasic } from "@/types/types";

type Params = {
  state: SearchCtxStateType;
  dispatch: React.ActionDispatch<[action: SearchCtxActionsType]>;
};

type ParamsBar = {
  el: "filterBar" | "sortBar";
  val: boolean;
};

export type SearchCtxValsConsumer = SearchCtxStateType & {
  setTxtInputs: (val: FormFieldBasic[]) => void;
  setBar: ({ el, val }: ParamsBar) => void;
};

export const useSearchCtxVals = ({
  state,
  dispatch,
}: Params): SearchCtxValsConsumer => {
  useEffect(() => {
    const listenSize = () => {
      dispatch({
        type: SearchCtxActions.SET_LABEL,
        payload: {
          label: "labelSearch",
          val: window.innerWidth > tailwindBreak.sm,
        },
      });
      dispatch({
        type: SearchCtxActions.SET_LABEL,
        payload: { label: "labelSubmit", val: window.innerWidth > 450 },
      });
    };

    window.addEventListener("resize", listenSize);
    return () => {
      window.removeEventListener("resize", listenSize);
    };
  }, []);

  const setTxtInputs = useCallback(
    (val: FormFieldBasic[]) =>
      dispatch({ type: SearchCtxActions.SET_TXT_INPUTS, payload: val }),
    []
  );

  const setBar = useCallback(
    ({ el, val }: ParamsBar) =>
      dispatch({ type: SearchCtxActions.SET_BAR, payload: { el, val } }),
    []
  );

  return {
    ...state,
    setTxtInputs,
    setBar,
  };
};
