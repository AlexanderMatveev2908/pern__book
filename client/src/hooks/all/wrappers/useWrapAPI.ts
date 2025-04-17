/* eslint-disable @typescript-eslint/no-explicit-any */
import { openToast } from "@/features/Toast/toastSlice";
import { EventApp } from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useErrAPI } from "./useErrAPI";
import { cg } from "@/lib/lib";

export const useWrapperAPI = () => {
  const dispatch = useDispatch();

  const { handleErrAPI } = useErrAPI();
  const wrapMutationAPI = useCallback(
    async ({
      cbAPI,
      push,
      pushNotice,
    }: {
      cbAPI: () => any;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
    }) => {
      try {
        const { status, data } = await cbAPI().unwrap();
        dispatch(
          openToast({
            type: EventApp.OK,
            msg: data?.msg || "operation successful",
            statusCode: status,
          })
        );

        cg("data api", data);

        return data;
      } catch (err: any) {
        return handleErrAPI({ err, push, pushNotice });
      }
    },
    [handleErrAPI, dispatch]
  );

  return { wrapMutationAPI };
};
