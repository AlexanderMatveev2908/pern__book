/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useCallback, useRef } from "react";
import {
  ParamsBar,
  ParamsPage,
  ParamsPending,
  ParamsPreSubmit,
  ParamsSearch,
  SearchCtxActions,
  SearchCtxActionsType,
} from "../reducer/actions";
import {
  ArgsSearchType,
  FieldJoinCatType,
  SearchCtxStateType,
} from "../reducer/initState";
import { ResPaginationAPI } from "@/types/types";
import { useGetSearchKeysStorage } from "@/core/hooks/all/forms/searchBar/useGetSearchKeysStorage";
import { saveStorage } from "@/core/lib/lib";

type Params = {
  state: SearchCtxStateType;
  dispatch: React.ActionDispatch<[action: SearchCtxActionsType]>;
};

type ParamsUpdateNoDebounce = {
  vals: ArgsSearchType;
  trigger: any;
};

export type SearchCtxValsConsumer = SearchCtxStateType & {
  oldVals: RefObject<ArgsSearchType | null>;
  setBar: (params: ParamsBar) => void;
  setSearch: (params: ParamsSearch) => void;
  setIsPending: (vals: ParamsPending) => void;
  setPreSubmit: (vals: ParamsPreSubmit) => void;
  updateValsNoDebounce: (vals: ParamsUpdateNoDebounce) => void;
  madeAPI: RefObject<boolean>;
  setPagination: (vals: ParamsPage) => void;
  setInnerJoinedCat: (val: FieldJoinCatType[]) => void;
};

export const useSearchCtxVals = ({
  state,
  dispatch,
}: Params): SearchCtxValsConsumer => {
  const oldVals = useRef<ArgsSearchType | null>(null);
  const madeAPI = useRef<boolean>(false);

  const { keyStorage } = useGetSearchKeysStorage();

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
    ({ vals, trigger }: ParamsUpdateNoDebounce) => {
      setPreSubmit({ el: "canMakeAPI", val: false });

      trigger({
        ...(vals as ResPaginationAPI<ArgsSearchType>),
        // ? JUST A BRUTE FORCE FETCH IF U WANT
        // _: Date.now(),
      });

      oldVals.current = vals;
      saveStorage({ data: vals, key: keyStorage as any });
    },
    [keyStorage, setPreSubmit]
  );

  const setPagination = useCallback(
    ({ el, val }: ParamsPage) =>
      dispatch({ type: SearchCtxActions.SET_PAGINATION, payload: { el, val } }),
    [dispatch]
  );

  const setInnerJoinedCat = useCallback(
    (val: FieldJoinCatType[]) => {
      dispatch({ type: SearchCtxActions.SET_INNER_JOINED_CAT, payload: val });
    },
    [dispatch]
  );

  return {
    ...state,
    oldVals,
    setBar,
    setSearch,
    setPagination,
    setIsPending,
    setPreSubmit,
    updateValsNoDebounce,
    madeAPI,
    setInnerJoinedCat,
  };
};
