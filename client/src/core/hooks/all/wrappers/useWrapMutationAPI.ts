/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseResAPI, EventApp } from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useErrAPI } from "./useErrAPI";
import { __cg } from "@/core/lib/lib";
import { openToast } from "@/features/common/Toast/toastSlice";
import { AxiosResponse } from "axios";

export const useWrapMutationAPI = () => {
  const dispatch = useDispatch();

  const { handleErrAPI } = useErrAPI();
  const wrapMutationAPI = useCallback(
    async <T extends BaseResAPI<Record<string, any>>>({
      cbAPI,
      push,
      pushNotice,
      showToast = true,
      customErrCB,
      hideErr,
    }: {
      cbAPI: () => any;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
      showToast?: boolean;
      customErrCB?: (err: any) => any;
      hideErr?: boolean;
    }): Promise<T | null> => {
      try {
        const data: T = await cbAPI().unwrap();

        __cg("mutation api", data);

        if (showToast)
          dispatch(
            openToast({
              type: EventApp.OK,
              msg: data?.msg || "operation successful",
              statusCode: data?.status,
            })
          );

        return data;
      } catch (err: any) {
        __cg("err mutation", err);

        return handleErrAPI({
          err: err as AxiosResponse,
          push,
          pushNotice,
          customCB: customErrCB,
          hideErr,
        });
      }
    },
    [handleErrAPI, dispatch]
  );

  return { wrapMutationAPI };
};
