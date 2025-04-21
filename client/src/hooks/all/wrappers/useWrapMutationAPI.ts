/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventApp } from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useErrAPI } from "./useErrAPI";
import { __cg } from "@/lib/lib";
import { openToast } from "@/features/common/Toast/toastSlice";

export const useWrapMutationAPI = () => {
  const dispatch = useDispatch();

  const { handleErrAPI } = useErrAPI();
  const wrapMutationAPI = useCallback(
    async ({
      cbAPI,
      push,
      pushNotice,
      customCB,
    }: {
      cbAPI: () => any;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
      customCB?: (err: any) => any;
    }) => {
      try {
        const data = await cbAPI().unwrap();

        __cg("mutation api", data);

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

        return handleErrAPI({ err, push, pushNotice, customCB });
      }
    },
    [handleErrAPI, dispatch]
  );

  return { wrapMutationAPI };
};
