/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthState,
  AvoidRefreshEnd,
  MsgCheckToken,
  MsgErrAccess,
} from "@/types/types";
import { formatMsgCode } from "../utils/formatters";

export const isAccessExpired = (msg: string) =>
  [...Object.values(MsgErrAccess)].includes(msg as MsgErrAccess);

export const isRefreshing = (endpoint: string) => endpoint === "/refresh";

export const isLoggingOut = (endpoint: string) =>
  endpoint === AvoidRefreshEnd.LOGOUT;

export const ignoreErr = (response: any) => {
  const { data, status, config } = response;

  return (
    isAccessExpired(data?.msg) ||
    isRefreshing(config?.url) ||
    [403, 429].includes(status)
  );
};

export const isUnHandledErr = (res: any) => {
  const { data, status } = res;

  const isUnhandled =
    [...Object.values(MsgCheckToken).map((msg) => formatMsgCode(msg))].includes(
      data?.msg
    ) && status === 401;

  return isUnhandled;
};

export const makeDelay = (cb: () => any, delay: number = 250) =>
  new Promise((res) =>
    setTimeout(async () => {
      const result = await cb();
      res(result);
    }, delay)
  );

export const addFlagCB = <T>(cb: T) => {
  (cb as T & { run: boolean }).run = true;

  return cb;
};

export const getData = (obj: any, key: string) => obj?.[key] ?? null;

export const getMsgErr = (data: any) =>
  data?.msg ||
  data?.message ||
  "The AI that manage the database has revolted and is taking control of all servers ⚙️";

export const canPushUser = (authState: AuthState) =>
  !authState.isLogged && !authState.loggingOut && !authState.pushedOut;
