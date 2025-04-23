/* eslint-disable @typescript-eslint/no-explicit-any */
import { setNotice } from "@/features/common/Notice/noticeSlice";
import { saveStorage } from "@/lib/lib";
import { AllowedFromApp, EventApp, StorageKeys } from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useNotice = () => {
  const nav = useNavigate();

  const dispatch = useDispatch();

  const makeNoticeCombo = useCallback(
    ({
      msg,
      status,
      cb,
    }: {
      status: number;
      msg: string;
      cb?: (() => any) | null;
    }) => {
      const notice = {
        notice: msg,
        type: status > 199 && status < 300 ? EventApp.OK : EventApp.ERR,
        status: status,
      };
      saveStorage({ data: notice, key: StorageKeys.NOTICE });
      dispatch(
        setNotice({ ...notice, cb: typeof cb === "function" ? cb : null })
      );

      nav("/notice", {
        replace: true,
        state: { from: AllowedFromApp.GEN },
      });
    },
    [dispatch, nav]
  );

  return {
    makeNoticeCombo,
  };
};
