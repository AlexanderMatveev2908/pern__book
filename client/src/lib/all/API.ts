/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllowedFromNotice, ErrAppMsgCode } from "@/types/types";

export const isAccessExpired = (msg: string) =>
  [
    ErrAppMsgCode.ACCESS_EXPIRED,
    ErrAppMsgCode.ACCESS_INVALID,
    ErrAppMsgCode.ACCESS_NOT_PROVIDED,
  ].includes(msg as ErrAppMsgCode);
export const isRefreshing = (endpoint: string) => endpoint === "/auth/refresh";

export const makeNoticeTxt = (txt: string) =>
  `We've sent you an email ${txt}. If you don't see it, check your spam folder, it might be partying there 🎉`;

export const canStayNotice = (from: string | null) =>
  Object.values(AllowedFromNotice).includes(from as AllowedFromNotice);

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
