/* eslint-disable @typescript-eslint/no-explicit-any */
import { setNotice } from "@/features/common/Notice/noticeSlice";
import { formatMsgCode, saveStorage } from "@/lib/lib";
import {
  AllowedFromApp,
  EventApp,
  MsgCheckToken,
  StorageKeys,
} from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useHandleForm401 = () => {
  const nav = useNavigate();

  const dispatch = useDispatch();

  const handleForm401 = useCallback(
    (err: any) => {
      const { response: { data, status } = {} } = err ?? {};

      if (
        status !== 401 ||
        ![
          ...Object.values(MsgCheckToken).map((message) =>
            formatMsgCode(message)
          ),
        ].includes(data?.msg)
      )
        return null;

      const newNotice = {
        notice: data?.msg,
        type: EventApp.ERR,
        status: 401,
      };
      dispatch(
        setNotice({
          ...newNotice,
        })
      );
      saveStorage({ data: newNotice, key: StorageKeys.NOTICE });

      nav("/notice", {
        replace: true,
        state: { from: AllowedFromApp.GEN },
      });

      return null;
    },
    [dispatch, nav]
  );

  return {
    handleForm401,
  };
};
