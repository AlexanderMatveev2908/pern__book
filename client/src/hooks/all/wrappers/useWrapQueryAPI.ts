/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { openToast } from "@/features/Toast/toastSlice";
import { EventApp } from "@/types/types";
import { useErrAPI } from "./useErrAPI";
import { cg } from "@/lib/lib";

export const useWrapQueryAPI = ({
  isSuccess,
  toast,
  data,
  isError,
  error,
  push,
  pushNotice,
}: any) => {
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
      if (isSuccess) {
        cg("data api", data);

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
