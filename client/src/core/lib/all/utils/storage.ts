import { StorageKeys } from "@/types/types";
import { capt } from "./formatters";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const saveStorage = ({ data, key }: { data: any; key: StorageKeys }) => {
  if (data === undefined || data === null)
    throw new Error("Invalid storage data");

  sessionStorage.setItem(
    key,
    typeof data !== "object" ? data : JSON.stringify(data)
  );
};

export const getStorage = (key: StorageKeys) => sessionStorage.getItem(key);

export const delKeyStorage = (key: StorageKeys) =>
  sessionStorage.removeItem(key);

export const removeStorage = () => {
  sessionStorage.clear();
};

// ? to avoid props calc name on path
export const formatP = (p: string) =>
  p
    .split("/")
    .filter((el) => !!el)
    .map((el, i) =>
      el
        .split("-")
        .filter((el) => !!el)
        .map((part, j) => (!i && !j ? part : capt(part)))
        .join("")
    )
    .join("");
