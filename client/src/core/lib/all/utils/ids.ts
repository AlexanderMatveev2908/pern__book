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
        .map((part) => capt(part))
        .join("")
    )
    .join("");
