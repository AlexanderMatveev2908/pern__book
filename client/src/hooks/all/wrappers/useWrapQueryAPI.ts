/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";
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
  customCB,
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
  customCB?: (err: any) => any;
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
      customCB,
    }: {
      isSuccess: boolean;
      data: any;
      isError: boolean;
      error: any;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
      toast?: boolean;
      customCB?: (err: any) => any;
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

        return handleErrAPI({ err: error, push, pushNotice, customCB });
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
    customCB,
    handleQueryAPI,
  ]);
};
