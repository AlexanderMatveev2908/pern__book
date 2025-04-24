import { openToast } from "@/features/common/Toast/toastSlice";
import { ignoreErr, getMsgErr } from "@/lib/lib";
import { EventApp } from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotice } from "../useNotice";
import { AxiosResponse } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useErrAPI = () => {
  const nav = useNavigate();

  const dispatch = useDispatch();

  const { makeNoticeCombo } = useNotice();

  const handleErrAPI = useCallback(
    ({
      err,
      push,
      pushNotice,
      customCB,
      hideErr,
    }: {
      err: AxiosResponse;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
      customCB?: (err: AxiosResponse) => any;
      hideErr?: boolean;
    }) => {
      const { data, status } = err ?? {};

      if (typeof customCB === "function") customCB(err);

      if (ignoreErr(err) || hideErr) return null;

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
        nav("/", { replace: true });
      } else if (pushNotice?.[0]) {
        makeNoticeCombo({
          status: status || 500,
          msg: message,
          cb: pushNotice?.[1] ?? null,
        });
      }

      return null;
    },
    [makeNoticeCombo, dispatch, nav]
  );

  return { handleErrAPI };
};

/*
      if (!canRun(push, pushNotice, customCB)) {
        throw new Error("Can not send user to different places at same time");
      } else if (typeof customCB === "function") {
        return customCB(err);
      } else if (push) {
        nav("/", { replace: true });
      } else if (pushNotice?.[0]) {
        makeNoticeCombo({
          status: status || 500,
          msg: message,
          cb: pushNotice?.[1] ?? null,
        });
      }
        */

/*
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
*/
