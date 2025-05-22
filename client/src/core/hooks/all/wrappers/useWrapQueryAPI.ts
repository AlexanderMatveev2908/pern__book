/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventApp } from "@/types/types";
import { useErrAPI } from "./useErrAPI";
import { __cg } from "@/core/lib/lib";
import { openToast } from "@/features/common/Toast/toastSlice";
import { AxiosResponse } from "axios";

type PersonalParams = {
  push?: boolean;
  pushNotice?: [boolean, (() => any)?];
  toast?: boolean;
  customErrCB?: (err: any) => any;
  hideErr?: boolean;
};

type ParamsHookQ = {
  isSuccess?: boolean;
  data?: any;
  isError?: boolean;
  error?: any;
} & PersonalParams;

export const useWrapQueryAPI = (params: ParamsHookQ) => {
  const dispatch = useDispatch();

  const { handleErrAPI } = useErrAPI();

  const handleQueryAPI = useCallback(
    async (params: ParamsHookQ) => {
      const {
        isSuccess,
        toast,
        data,
        isError,
        error,
        push,
        pushNotice,
        customErrCB,
        hideErr,
      } = params ?? {};

      if (isSuccess) {
        __cg("query api", data);

        if (toast)
          dispatch(
            openToast({
              type: EventApp.OK,
              msg: data?.msg || "operation successful",
              statusCode: data?.status,
            })
          );
      } else if (isError) {
        __cg("err query", error);

        return handleErrAPI({
          err: error as AxiosResponse,
          push,
          pushNotice,
          customCB: customErrCB,
          hideErr,
        });
      }
    },
    [handleErrAPI, dispatch]
  );

  const {
    isSuccess,
    toast,
    data,
    isError,
    error,
    push,
    pushNotice,
    customErrCB,
    hideErr,
  } = params ?? {};

  useEffect(() => {
    handleQueryAPI({
      isSuccess,
      toast,
      data,
      isError,
      error,
      push,
      pushNotice,
      customErrCB,
      hideErr,
    });
  }, [
    handleQueryAPI,
    isSuccess,
    toast,
    data,
    isError,
    error,
    push,
    pushNotice,
    customErrCB,
    hideErr,
  ]);
};
