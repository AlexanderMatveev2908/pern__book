import authSlice from "@/features/AuthLayout/authSlice";
import noticeSlice from "@/features/common/Notice/noticeSlice";
import { getMsgErr, goTo, removeStorage, saveStorage } from "@/lib/lib";
import { AllowedFromApp, EventApp, StorageKeys } from "@/types/types";
import apiSlice from "../apiSlice";
import toastSlice from "@/features/common/Toast/toastSlice";
import { AxiosResponse } from "axios";
import { MiddlewareAPI } from "@reduxjs/toolkit";

export const handle429 = (store: MiddlewareAPI, err: AxiosResponse) => {
  const { data, status } = err;

  const msg = getMsgErr(data);
  const newNotice = {
    notice: msg,
    type: EventApp.ERR,
    status: status || 500,
  };

  if (data?.pushOut) {
    removeStorage();
    store.dispatch(authSlice.actions.setPushedOut());
    store.dispatch(
      noticeSlice.actions.setNotice({
        ...newNotice,
        cb: () => {
          store.dispatch(apiSlice.util.resetApiState());
          store.dispatch(authSlice.actions.clearNavigating());
        },
      })
    );
  } else {
    store.dispatch(
      noticeSlice.actions.setNotice({
        ...newNotice,
      })
    );
  }
  saveStorage({
    data: newNotice,
    key: StorageKeys.NOTICE,
  });

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
};
