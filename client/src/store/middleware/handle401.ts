/* eslint-disable @typescript-eslint/no-explicit-any */
import toastSlice from "@/features/Toast/toastSlice";
import {
  __cg,
  formatMsgCode,
  getStorage,
  goTo,
  removeStorage,
} from "@/lib/lib";
import { EventApp, MsgErrSession, StorageKeys } from "@/types/types";
import authSlice from "@/features/AuthLayout/authSlice";

export const handleLogoutWithAccessExp = (store: any) => {
  removeStorage();

  __cg("logout expired");

  store.dispatch(authSlice.actions.setPushedOut(true));

  store.dispatch(
    toastSlice.actions.openToast({
      msg: "logout successful",
      type: EventApp.OK,
      statusCode: 200,
    })
  );

  store.dispatch(authSlice.actions.setLoggingOut(true));
  store.dispatch(authSlice.actions.logout());

  goTo("/", { replace: true });

  return null;
};

const getMsg401 = (data: any, isLogged: boolean) =>
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

export const handle401 = ({
  store,
  response,
}: {
  store: any;
  response: any;
}) => {
  const { data, status } = response;
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

  store.dispatch(authSlice.actions.setPushedOut(true));
  store.dispatch(authSlice.actions.logout());

  goTo("/auth/login", { replace: true });

  return null;
};
