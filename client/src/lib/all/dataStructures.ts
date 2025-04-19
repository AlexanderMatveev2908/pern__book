import { REG_ID } from "@/config/regex";
import { TokenEventType } from "@/types/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObjOk = (obj: any, valsCb?: (val: any) => boolean) =>
  !!Object.keys(obj ?? {}).length &&
  Object.values(obj ?? {}).every(valsCb ?? ((val) => val || val !== undefined));

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
