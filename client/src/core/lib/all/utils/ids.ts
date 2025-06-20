/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from "uuid";
import { capt } from "./formatters";

export const addArrIDs = <T>(arr: T[]): (T & { id: string })[] =>
  arr.map((el) => ({
    ...el,
    id: v4(),
  }));

export const getSearchBarID = (path: string) =>
  "searchBar" +
  path
    .split("/")
    .slice(1)
    .map((el) =>
      el
        .split("-")
        .filter((el) => !!el)
        .map((part) => capt(part))
        .join("")
    )
    .join("");

export const calcSearchbarID = (path: string) =>
  "searchBar" +
  path
    .split("/")
    .filter((el) => !!el)
    .map((el) =>
      el
        .split("-")
        .filter((el) => !!el)
        .map((el) => capt(el))
        .join("")
    )
    .join("");

export const addNestedIDs = <T>(arr: T[]): T[] =>
  arr.map((el) => ({
    ...el,
    id: v4(),
    fields: (el as any).fields.map((sub: any) => ({
      ...sub,
      id: v4(),
    })),
  }));
