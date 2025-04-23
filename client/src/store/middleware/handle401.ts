/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  __cg,
  formatMsgCode,
  getStorage,
  goTo,
  removeStorage,
} from "@/lib/lib";
import { EventApp, MsgErrRefresh, StorageKeys } from "@/types/types";
import authSlice from "@/features/AuthLayout/authSlice";
import toastSlice from "@/features/common/Toast/toastSlice";

export const handleLogoutWithAccessExp = (store: any) => {
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

const getMsg401 = (data: any, isLogged: boolean) =>
  [
    ...Object.values(MsgErrRefresh).filter(
      (msg) => msg !== MsgErrRefresh.REFRESH_EXPIRED
    ),
  ].includes(data?.msg)
    ? formatMsgCode(data?.msg)
    : data?.msg === MsgErrRefresh.REFRESH_EXPIRED ||
      isLogged ||
      getStorage(StorageKeys.ACCESS)
    ? "session expired"
    : data?.message ||
      "The AI that manage the database has revolted and is taking control of all servers ⚙️";

export const handle401 = ({ store, err }: { store: any; err: any }) => {
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
