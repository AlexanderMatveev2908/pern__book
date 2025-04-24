/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventApp } from "@/types/types";
import { useErrAPI } from "./useErrAPI";
import { __cg } from "@/lib/lib";
import { openToast } from "@/features/common/Toast/toastSlice";
import { AxiosResponse } from "axios";

export const useWrapQueryAPI = ({
  isSuccess,
  toast,
  data,
  isError,
  error,
  push,
  pushNotice,
  customErrCB,
  //  @ts-expect-error A meteorite could hit my room and during the explosion push on main code with incorrect types
  // eslint-disable-next-line
  ...args
}: {
  isSuccess: boolean;
  data: any;
  isError: boolean;
  error: any;
  push?: boolean;
  pushNotice?: [boolean, (() => any)?];
  toast?: boolean;
  args?: any;
  customErrCB?: (err: any) => any;
}) => {
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
      customErrCB,
      hideErr,
    }: {
      isSuccess: boolean;
      data: any;
      isError: boolean;
      error: any;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
      toast?: boolean;
      customErrCB?: (err: any) => any;
      hideErr?: boolean;
    }) => {
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
    customErrCB,
    handleQueryAPI,
  ]);
};
