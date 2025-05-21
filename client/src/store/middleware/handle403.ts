import noticeSlice from "@/features/Notice/noticeSlice";
import {
  AllowedFromApp,
  EventApp,
  MsgCheckToken,
  StorageKeys,
} from "@/types/types";
import { formatMsgCode, getMsgErr, goTo, saveStorage } from "@/core/lib/lib";
import toastSlice from "@/features/common/Toast/toastSlice";
import { AxiosResponse } from "axios";
import { MiddlewareAPI } from "@reduxjs/toolkit";

export const formattedMessagesVerify = Object.values(MsgCheckToken).map((msg) =>
  formatMsgCode(msg)
);

export const handleErr403 = ({
  store,
  err,
}: {
  store: MiddlewareAPI;
  err: AxiosResponse;
}) => {
  const { data, status } = err;

  const msg = getMsgErr(data);
  const newNotice = {
    notice: msg,
    type: EventApp.ERR,
    status: status || 500,
  };
  saveStorage({
    data: newNotice,
    key: StorageKeys.NOTICE,
  });

  store.dispatch(
    noticeSlice.actions.setNotice({
      ...newNotice,
    })
  );
  store.dispatch(
    toastSlice.actions.openToast({
      type: EventApp.ERR,
      msg,
      statusCode: status,
    })
  );

  goTo("/notice", {
    replace: true,
    state: { from: AllowedFromApp.GEN },
  });

  return null;
};
