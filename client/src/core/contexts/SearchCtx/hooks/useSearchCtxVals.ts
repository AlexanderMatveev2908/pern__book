import { useCallback, useEffect } from "react";
import {
  ParamsBar,
  ParamsPending,
  ParamsSearch,
  SearchCtxActions,
  SearchCtxActionsType,
} from "../reducer/actions";
import { ArgsSearchType, SearchCtxStateType } from "../reducer/initState";
import { tailwindBreak } from "@/core/config/breakpoints";
import { FormFieldBasic } from "@/types/types";
import { FieldErrors } from "react-hook-form";
import { isObjOk } from "@/core/lib/lib";

type Params = {
  state: SearchCtxStateType;
  dispatch: React.ActionDispatch<[action: SearchCtxActionsType]>;
};

export type SearchCtxValsConsumer = SearchCtxStateType & {
  setTxtInputs: (val: FormFieldBasic[]) => void;
  setBar: (params: ParamsBar) => void;
  setSearch: (params: ParamsSearch) => void;
  setArgs: (vals: ArgsSearchType) => void;
  setIsPending: (vals: ParamsPending) => void;
  setBtnDisabled: (errs: FieldErrors) => void;
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
        payload: {
          label: "labelSubmit",
          val: window.innerWidth > tailwindBreak.lg,
        },
      });
    };

    window.addEventListener("resize", listenSize);
    return () => {
      window.removeEventListener("resize", listenSize);
    };
  }, [dispatch]);

  const setTxtInputs = useCallback(
    (val: FormFieldBasic[]) =>
      dispatch({ type: SearchCtxActions.SET_TXT_INPUTS, payload: val }),
    [dispatch]
  );

  const setBar = useCallback(
    ({ el, val }: ParamsBar) =>
      dispatch({ type: SearchCtxActions.SET_BAR, payload: { el, val } }),
    [dispatch]
  );

  const setSearch = useCallback(
    ({ el, val }: ParamsSearch) =>
      dispatch({ type: SearchCtxActions.SET_SEARCH, payload: { el, val } }),
    [dispatch]
  );

  const setArgs = useCallback(
    (vals: ArgsSearchType) => {
      dispatch({ type: SearchCtxActions.SET_ARGS, payload: vals });
    },
    [dispatch]
  );

  const setIsPending = useCallback(
    ({ el, val }: ParamsPending) => {
      dispatch({ type: SearchCtxActions.SET_IS_PENDING, payload: { el, val } });
    },
    [dispatch]
  );

  const setBtnDisabled = useCallback(
    (errs: FieldErrors) => {
      const hasErr =
        !!Object.keys(errs ?? {}).length &&
        Object.values(errs).every((el) => isObjOk(el));

      if (hasErr === state.isBtnDisabled) return null;

      dispatch({ type: SearchCtxActions.SET_BTN_DISABLED, payload: hasErr });
    },
    [dispatch, state.isBtnDisabled]
  );

  return {
    ...state,
    setTxtInputs,
    setBar,
    setSearch,
    setArgs,
    setIsPending,
    setBtnDisabled,
  };
};
