/* eslint-disable @typescript-eslint/no-explicit-any */
import { setNotice } from "@/features/common/Notice/noticeSlice";
import { openToast } from "@/features/common/Toast/toastSlice";
import { ignoreErr, getMsgErr, saveStorage } from "@/lib/lib";
import { AllowedFromApp, EventApp, StorageKeys } from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const canRun = (...args: any[]) => {
  let isOk = true;
  let count = 0;

  for (const arg of args) {
    if (typeof arg === "boolean" && arg) count++;
    if (Array.isArray(arg) && arg.length) count++;
    if (typeof arg === "function") count++;

    if (count > 1) {
      isOk = false;
      break;
    }
  }

  return isOk;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useErrAPI = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleErrAPI = useCallback(
    ({
      err,
      push,
      pushNotice,
      customCB,
    }: {
      err: any;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
      customCB?: (err: any) => any;
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

      if (!canRun(push, pushNotice, customCB)) {
        throw new Error("Can not send user to different places at same time");
      } else if (typeof customCB === "function") {
        customCB(err);
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
          state: { from: AllowedFromApp.GEN },
        });
      }

      return null;
    },
    [dispatch, navigate]
  );

  return { handleErrAPI };
};
