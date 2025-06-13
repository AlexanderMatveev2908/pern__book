/* eslint-disable @typescript-eslint/no-explicit-any */
import { DispatchType, store } from "@/core/store/store";
import { TagsAPI } from "@/types/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Params = {
  nameQ: string;
  slice: any;
  tag: TagsAPI;
};

export const useClearCacheItem = ({ nameQ, slice, tag }: Params) => {
  const dispatch: DispatchType = useDispatch();

  const state = store.getState();
  const allQ = state.appAPI.queries;
  const itemQ = Object.entries(allQ ?? {}).find(([k]) =>
    k.includes(nameQ)
  )?.[1];

  useEffect(() => {
    if ((itemQ as any)?.data?.ninja === "🥷🏼") {
      dispatch(slice.util.invalidateTags([tag]));
    }
  }, [dispatch, itemQ, slice, nameQ, tag]);
};
