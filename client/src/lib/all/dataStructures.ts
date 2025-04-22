import { REG_ID, REG_TOK } from "@/config/regex";
import { ParamsVerifyCB } from "@/features/common/VerifyCb/verifyCbSliceAPI";
import { TokenEventType } from "@/types/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObjOk = (obj: any, valsCb?: (val: any) => boolean) =>
  !!Object.keys(obj ?? {}).length &&
  Object.values(obj ?? {}).every(valsCb ?? ((val) => val || val !== undefined));

export const checkQueryAuth = (
  searchParams: URLSearchParams
): ParamsVerifyCB | null => {
  const userID = searchParams.get("userID") ?? "";
  const token = searchParams.get("token") ?? "";
  const event = searchParams.get("event") ?? "";

  const match =
    REG_ID.test(userID) &&
    REG_TOK.test(token) &&
    Object.values(TokenEventType).includes(event as TokenEventType);

  return match ? { userID, token, event: event as TokenEventType } : null;
};

export const parseNull = (str: string) => (str.trim().length ? str : null);
