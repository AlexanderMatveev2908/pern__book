import { REG_ID, REG_TOK } from "@/core/config/regex";
import { ParamsVerifyCB } from "@/features/VerifyCb/verifyCbSliceAPI";
import { NestedIndexProp, TokenEventType } from "@/types/types";
import { AxiosError } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObjOk = (obj: any, valsCb?: (val: any) => boolean) =>
  !!Object.keys(obj ?? {}).length &&
  Object.values(obj ?? {}).every(valsCb ?? ((val) => val || val !== undefined));

export const checkQueryAuth = (
  searchParams: URLSearchParams,
  storageTok?: string
): ParamsVerifyCB | null => {
  const userID = searchParams.get("userID") ?? "";
  const token = storageTok ?? searchParams.get("token") ?? "";
  const event = searchParams.get("event") ?? "";

  const match =
    REG_ID.test(userID) &&
    REG_TOK.test(token) &&
    Object.values(TokenEventType).includes(event as TokenEventType);

  return match ? { userID, token, event: event as TokenEventType } : null;
};

export const makeObj = (
  original: any,
  keys: string[],
  custom?: (key: string) => any
) =>
  keys.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]:
        typeof custom === "function"
          ? custom(curr)
          : (original as any)?.[curr] || null,
    }),
    {}
  );

export const isSameData = (obj1: any, obj2: any): any => {
  if (obj1 === obj2) return true;

  if ([obj1, obj2].some((el) => typeof el !== "object" || el === null))
    return false;

  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) return false;
    // here check each item for item, like item1_a to item2_a, then item1_b to item2_b and so on, maybe would be better with letters as param and numbers after underscore but the concept is the same
    return obj1.every((el, i) => isSameData(el, obj2[i]));
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  // same as for array but no index, instead just key for key for each object until the smallest type of val( i mean primitive for small )
  if (!keys1.every((key) => keys2.includes(key))) return false;
  return keys1.every((key) => isSameData(obj1[key], obj2[key]));
};

export const genHEX = () => {
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((el) => el.toString(16).padStart(2, "0"))
    .join("");
};

export const cpyObj = <T>(obj: T): T => {
  if (typeof obj !== "object" || obj === null) return obj;

  if (obj instanceof Date) return new Date(obj.getTime()) as T;

  if (Array.isArray(obj)) return obj.map((el) => cpyObj(el)) as T;

  const cpy = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      cpy[key] = cpyObj(obj[key]);
  }

  return cpy;
};

export const isValidNumber = (txt?: string) =>
  !!txt?.trim()?.length && !isNaN(+txt) && +(txt ?? "0");

export const clearTimer = (timerID: React.RefObject<NodeJS.Timeout | null>) => {
  if (timerID.current) {
    clearTimeout(timerID.current);
    timerID.current = null;
  }
};

export const isStr = (str?: string | null) => !!str?.trim()?.length;

export const isArr = <T>(arr?: T[]): boolean =>
  Array.isArray(arr) && !!arr?.length;

export const replacePoint = (val: number) => (val + "").replace(".", "_");

export const canNestedPass = (nestedIndex?: NestedIndexProp) =>
  typeof nestedIndex === "object" &&
  nestedIndex !== null &&
  "index" in nestedIndex &&
  "key" in nestedIndex;

export const serializeObjRtk = (err: AxiosError<any, any>) => {
  const { response } = err;
  const { data, status, config } = response ?? {};

  return {
    response: {
      config: {
        url: config?.url,
        method: config?.method,
        baseURL: config?.baseURL,
        headers: {
          "Content-Type": config?.headers?.["Content-Type"],
          Authorization: config?.headers?.Authorization,
        },
      },
      data: data,
      status: status,
    },
  };
};

export const isArrOk = (arr?: any) =>
  Array.isArray(arr) && !!arr.length && arr.every((el) => isObjOk(el));
