/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  formatMsgCode,
  getStorage,
  goTo,
  isRefreshing,
  removeStorage,
} from "@/lib/lib";
import authSlice from "@/features/AuthLayout/authSlice";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { EventApp, MsgErrSession, StorageKeys } from "@/types/types";
import toastSlice from "@/features/Toast/toastSlice";
import apiSlice from "../apiSlice";

const handleLogoutWithAccessExp = (store: any) => {
  removeStorage();

  store.dispatch(
    toastSlice.actions.openToast({
      msg: "logout successful",
      type: EventApp.OK,
      statusCode: 200,
    })
  );

  store.dispatch(authSlice.actions.setLoggingOut(true));
  store.dispatch(authSlice.actions.logout());
  store.dispatch(apiSlice.util.resetApiState());

  goTo("/", { replace: true });
};

const getMsg = (data: any, isLogged: boolean) =>
  [
    MsgErrSession.REFRESH_NOT_EMITTED,
    MsgErrSession.REFRESH_NOT_PROVIDED,
    MsgErrSession.REFRESH_INVALID,
  ].includes(data?.msg)
    ? formatMsgCode(data?.msg)
    : data?.msg === MsgErrSession.REFRESH_EXPIRED ||
      isLogged ||
      getStorage(StorageKeys.ACCESS)
    ? "session expired"
    : data?.message ||
      "The AI that manage the database has revolted and is taking control of all servers ⚙️";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handle401 = (store: any) => (next: any) => (action: any) => {
  const { payload } = action;

  const isLogged = store.getState().auth.isLogged;
  const { response: { data, status, config } = {} } = payload ?? {};

  if (payload?.refreshed) {
    if (!isLogged) store.dispatch(authSlice.actions.login());
  }
  if (isRejectedWithValue(action)) {
    if (status === 401 && data?.loggingOut) {
      handleLogoutWithAccessExp(store);
      return null;
    }
    if (status !== 401 || !isRefreshing(config?.url)) return next(action);

    removeStorage();

    store.dispatch(
      toastSlice.actions.openToast({
        msg: getMsg(data, isLogged),
        type: EventApp.ERR,
        statusCode: status,
      })
    );

    store.dispatch(authSlice.actions.logout());
    store.dispatch(apiSlice.util.resetApiState());

    goTo("/auth/login", { replace: true });

    return null;
  }

  return next(action);
};

/*
  if (isRejectedWithValue(action)) {
    if (status === 401 && data?.loggingOut) {
      handleLogoutWithAccessExp(store);
      return null;
    }
    if (status !== 401 || !isRefreshing(config?.url)) return next(action);

    // store.dispatch(authSlice.actions.setLoggingOut(true));
    const message = getMsg(data, isLogged);
    // const newNotice = { notice: message, type: EventApp.ERR };
    store.dispatch(
      toastSlice.actions.openToast({
        msg: message,
        type: EventApp.ERR,
        statusCode: status,
      })
    );
    // store.dispatch(
    //   noticeSlice.actions.setNotice({
    //     ...newNotice,
    //   })
    // );

    removeStorage();
    // saveStorage({ data: newNotice, key: StorageKeys.NOTICE });

    store.dispatch(authSlice.actions.logout());
    store.dispatch(apiSlice.util.resetApiState());

    // goTo("/auth/login", { replace: true });
    // goTo("/notice", { replace: true, state: { from: AllowedFromNotice.EXP } });

    return null;
  }
    */
