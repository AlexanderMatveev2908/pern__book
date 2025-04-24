/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  __cg,
  formatMsgCode,
  getStorage,
  goTo,
  removeStorage,
} from "@/lib/lib";
import { EventApp, MsgErrRefresh, ResApp, StorageKeys } from "@/types/types";
import authSlice from "@/features/AuthLayout/authSlice";
import toastSlice from "@/features/common/Toast/toastSlice";
import { AxiosResponse } from "axios";
import { MiddlewareAPI } from "@reduxjs/toolkit";

const getMsg401 = (data: ResApp["data"], isLogged: boolean) =>
  [
    ...Object.values(MsgErrRefresh).filter(
      (msg) => msg !== MsgErrRefresh.REFRESH_EXPIRED
    ),
  ].includes(data?.msg as any)
    ? formatMsgCode(data?.msg)
    : data?.msg === MsgErrRefresh.REFRESH_EXPIRED ||
      isLogged ||
      getStorage(StorageKeys.ACCESS)
    ? "session expired"
    : data?.message ||
      "The AI that manage the database has revolted and is taking control of all servers ⚙️";

export const handleLogoutWithAccessExp = (store: MiddlewareAPI) => {
  removeStorage();

  __cg("logout expired");

  store.dispatch(
    toastSlice.actions.openToast({
      msg: "logout successful",
      type: EventApp.OK,
      statusCode: 200,
    })
  );

  store.dispatch(authSlice.actions.setLoggingOut());

  goTo("/", { replace: true });

  return null;
};

export const handle401 = ({
  store,
  err,
}: {
  store: MiddlewareAPI;
  err: AxiosResponse;
}) => {
  const { data, status } = err;
  const isLogged = store.getState().auth.isLogged;

  const isAlreadyPushed = store.getState().auth.pushedOut;
  if (isAlreadyPushed) return null;

  removeStorage();

  store.dispatch(
    toastSlice.actions.openToast({
      msg: getMsg401(data, isLogged),
      type: EventApp.ERR,
      statusCode: status,
    })
  );

  store.dispatch(authSlice.actions.setPushedOut());

  goTo("/auth/login", { replace: true });

  return null;
};
