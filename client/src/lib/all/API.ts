/* eslint-disable @typescript-eslint/no-explicit-any */
import { REG_ID } from "@/config/regex";
import { AvoidTriggerPath, MsgErrSession, TokenEventType } from "@/types/types";

export const isAccessExpired = (msg: string) =>
  [
    MsgErrSession.ACCESS_EXPIRED,
    MsgErrSession.ACCESS_INVALID,
    MsgErrSession.ACCESS_NOT_PROVIDED,
  ].includes(msg as MsgErrSession);

export const isRefreshing = (endpoint: string) => endpoint === "/refresh";

export const isLoggingOut = (endpoint: string) =>
  endpoint === AvoidTriggerPath.LOGOUT;

export const canToast = (response: any) => {
  const { data, status, config } = response;

  if (
    isAccessExpired(data?.msg) ||
    isRefreshing(config?.url) ||
    [403, 429].includes(status)
  )
    return null;

  return true;
};

export const makeDelay = (cb: () => any) =>
  new Promise((res) =>
    setTimeout(async () => {
      const result = await cb();
      res(result);
    }, 250)
  );

export const addFlagCB = <T>(cb: T) => {
  (cb as T & { run: boolean }).run = true;

  return cb;
};

export const checkQueryAuth = ({
  userID,
  token,
  event,
}: {
  userID: string;
  token: string;
  event: TokenEventType;
}) =>
  REG_ID.test(userID) &&
  !!token.length &&
  Object.values(TokenEventType).includes(event);

export const getData = (obj: any, key: string) => obj?.[key] ?? null;

export const getMsgErr = (data: any) =>
  data?.msg ||
  data?.message ||
  "The AI that manage the database has revolted and is taking control of all servers ⚙️";
