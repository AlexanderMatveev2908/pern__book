import { ReqApp } from "../../types/types.js";

export const formatMsgApp = (str: string) => str.split("_").join(" ");

export const capChar = (txt: string) => txt.at(0)?.toUpperCase() + txt.slice(1);

export const captAll = (txt: string) =>
  txt
    .trim()
    .split(" ")
    .map((el) => (el ? capChar(el) : ""))
    .join(" ")
    .trim()
    .replace(/[\s\s]{2,}/g, " ");

export const findVal = (val: string | string[], key: string) =>
  (Array.isArray(val) && val.includes(key)) || val === key ? key : null;

export const formatFloat = (val: number) => +val.toFixed(2);

export const extractSorters = (req: ReqApp): { order: [string, string][] } =>
  ({
    order: [
      ...Object.entries(req.query ?? {})
        .filter((pair) => pair[0].includes("Sort"))
        .map((pair) => [pair[0].replace("Sort", ""), pair[1]]),
    ],
  } as { order: [string, string][] });

export const extractOffset = (req: ReqApp) => ({
  offset: +req.query.page! * +req.query.limit!,
  limit: +req.query.limit!,
});

export const extractNoHits = <T>(
  req: ReqApp,
  count: T[]
): {
  nHits: number;
  totPages: number;
} => ({
  nHits: count.length,
  totPages: Math.ceil(count.length / +req.query.limit!),
});
