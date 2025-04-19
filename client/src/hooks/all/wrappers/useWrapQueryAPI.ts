/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { openToast } from "@/features/Toast/toastSlice";
import { EventApp } from "@/types/types";
import { useErrAPI } from "./useErrAPI";
import { __cg } from "@/lib/lib";

export const useWrapQueryAPI = ({
  isSuccess,
  toast,
  data,
  isError,
  error,
  push,
  pushNotice,
}: any) => {
  const hasRun = useRef(false);
  const dispatch = useDispatch();

  const { handleErrAPI } = useErrAPI();

  const handleQueryAPI = useCallback(
    async ({
      isSuccess,
      toast,
      data,
      isError,
      error,
      push,
      pushNotice,
    }: {
      isSuccess: boolean;
      isError: boolean;
      error: any;
      toast?: boolean;
      data?: any;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
    }) => {
      if (hasRun.current) {
        hasRun.current = false;
        return null;
      }

      hasRun.current = true;

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
        return handleErrAPI({ err: error, push, pushNotice });
      }
    },
    [handleErrAPI, dispatch]
  );

  useEffect(() => {
    handleQueryAPI({
      isSuccess,
      toast,
      data,
      isError,
      error,
      push,
      pushNotice,
    });
  }, [
    isSuccess,
    toast,
    data,
    isError,
    error,
    push,
    pushNotice,
    handleQueryAPI,
  ]);
};
