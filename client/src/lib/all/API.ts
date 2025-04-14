import { ErrAppMsgCode } from "@/types/types";

export const isAccessExpired = (msg: string) =>
  [
    ErrAppMsgCode.ACCESS_EXPIRED,
    ErrAppMsgCode.ACCESS_INVALID,
    ErrAppMsgCode.ACCESS_NOT_PROVIDED,
  ].includes(msg as ErrAppMsgCode);
export const isRefreshing = (endpoint: string) => endpoint === "/auth/refresh";
