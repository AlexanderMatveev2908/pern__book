import { RefObject, useCallback, useRef } from "react";
import {
  ParamsBar,
  ParamsPending,
  ParamsPreSubmit,
  ParamsSearch,
  SearchCtxActions,
  SearchCtxActionsType,
} from "../reducer/actions";
import { ArgsSearchType, SearchCtxStateType } from "../reducer/initState";
import { FormFieldBasic, ResPaginationAPI } from "@/types/types";
import { useGetSearchKeysStorage } from "@/core/hooks/all/forms/searchBar/useGetSearchKeysStorage";
import { saveStorage } from "@/core/lib/lib";

type Params = {
  state: SearchCtxStateType;
  dispatch: React.ActionDispatch<[action: SearchCtxActionsType]>;
};

type ParamsUpdateNoDebounce = {
  vals: ArgsSearchType;
  force?: boolean;
};

export type SearchCtxValsConsumer = SearchCtxStateType & {
  oldVals: RefObject<ArgsSearchType | null>;
  setTxtInputs: (val: FormFieldBasic[]) => void;
  setBar: (params: ParamsBar) => void;
  setSearch: (params: ParamsSearch) => void;
  setArgs: (vals: ArgsSearchType) => void;
  setIsPending: (vals: ParamsPending) => void;
  setPreSubmit: (vals: ParamsPreSubmit) => void;
  updateValsNoDebounce: ({ vals, force }: ParamsUpdateNoDebounce) => void;
  madeAPI: RefObject<boolean>;
};

export const useSearchCtxVals = ({
  state,
  dispatch,
}: Params): SearchCtxValsConsumer => {
  const oldVals = useRef<ArgsSearchType | null>(null);
  const madeAPI = useRef<boolean>(false);

  const { keyStorageVals } = useGetSearchKeysStorage();

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

  const setPreSubmit = useCallback(
    ({ el, val }: ParamsPreSubmit) =>
      dispatch({ type: SearchCtxActions.SET_PRE_SUBMIT, payload: { el, val } }),
    [dispatch]
  );

  const updateValsNoDebounce = useCallback(
    ({ vals, force }: ParamsUpdateNoDebounce) => {
      setPreSubmit({ el: "canMakeAPI", val: false });

      setArgs({
        ...(vals as ResPaginationAPI<ArgsSearchType>),
        ...(force ? { _: Date.now() } : {}),
      });

      oldVals.current = vals;
      saveStorage({ data: vals, key: keyStorageVals });
    },
    [setArgs, keyStorageVals, setPreSubmit]
  );

  return {
    ...state,
    oldVals,
    setTxtInputs,
    setBar,
    setSearch,
    setArgs,
    setIsPending,
    setPreSubmit,
    updateValsNoDebounce,
    madeAPI,
  };
};
