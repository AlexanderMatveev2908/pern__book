import { setNotice } from "@/features/Notice/noticeSlice";
import { openToast } from "@/features/Toast/toastSlice";
import { ignoreErr, getMsgErr, saveStorage } from "@/lib/lib";
import { AllowedFromNotice, EventApp, StorageKeys } from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useErrAPI = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleErrAPI = useCallback(
    ({
      err,
      push,
      pushNotice,
    }: {
      err: any;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
    }) => {
      const { response } = err ?? {};
      const { data, status } = response ?? {};

      if (ignoreErr(response)) return null;

      const message = getMsgErr(data);

      dispatch(
        openToast({
          type: EventApp.ERR,
          msg: message,
          statusCode: status,
        })
      );

      if (push && pushNotice) {
        throw new Error("Can not send user to different places at same time");
      } else if (push) {
        navigate("/", { replace: true });
      } else if (pushNotice?.[0]) {
        dispatch(
          setNotice({
            notice: message,
            type: EventApp.ERR,
            cb: pushNotice?.[1] ?? null,
          })
        );
        saveStorage({
          data: { notice: data?.msg, type: EventApp.ERR },
          key: StorageKeys.NOTICE,
        });

        navigate("/notice", {
          replace: true,
          state: { from: AllowedFromNotice.GEN },
        });
      }

      return null;
    },
    [dispatch, navigate]
  );

  return { handleErrAPI };
};
