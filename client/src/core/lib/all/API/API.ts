/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthState,
  AvoidRefreshEnd,
  MsgCheckToken,
  MsgErrAccess,
} from "@/types/types";
import { formatMsgCode } from "../utils/formatters";
import { setLimitCards } from "../styleHandlers";

export const isAccessExpired = (msg: string) =>
  [...Object.values(MsgErrAccess)].includes(msg as MsgErrAccess);

export const isRefreshing = (endpoint: string) => endpoint === "/refresh";

export const isLoggingOut = (endpoint: string) =>
  endpoint === AvoidRefreshEnd.LOGOUT;

export const ignoreErr = (err: any) => {
  const { data, status, config } = err;

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

export const makeDelay = async (cb: () => any, delay: number = 250) =>
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
  "A Snorlax has fallen asleep blocking the road, try later 💤🛏️";

export const canPushUser = (authState: AuthState) =>
  !authState.isLogged && !authState.loggingOut && !authState.pushedOut;

export const catchErr = async (cb: () => Promise<void>) => {
  try {
    await cb();
  } catch {
    //
  }
};

export const getDefValsPagination = (
  page: number = 0
): {
  limit: number;
  page: number;
} => ({
  page,
  limit: setLimitCards(),
});
