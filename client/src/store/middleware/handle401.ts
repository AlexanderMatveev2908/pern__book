/* eslint-disable @typescript-eslint/no-explicit-any */
import toastSlice from "@/features/Toast/toastSlice";
import { formatMsgCode, getStorage, goTo, removeStorage } from "@/lib/lib";
import { EventApp, MsgErrSession, StorageKeys } from "@/types/types";
import apiSlice from "../apiSlice";
import authSlice from "@/features/AuthLayout/authSlice";

export const handleLogoutWithAccessExp = (store: any) => {
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
  isLogged,
  response,
}: {
  store: any;
  response: any;
  isLogged: boolean;
}) => {
  const { data, status } = response;

  removeStorage();

  store.dispatch(
    toastSlice.actions.openToast({
      msg: getMsg401(data, isLogged),
      type: EventApp.ERR,
      statusCode: status,
    })
  );

  store.dispatch(authSlice.actions.logout());
  store.dispatch(apiSlice.util.resetApiState());

  goTo("/auth/login", { replace: true });

  return null;
};
