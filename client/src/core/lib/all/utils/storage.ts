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
    .slice(1)
    .map((el, i) =>
      el
        .split("-")
        .map((part, j) => (!i && !j ? part : capt(part)))
        .filter((el) => !!el)
        .join("")
    )
    .filter((el) => !!el)
    .join("");

export const getKeysSearchBar = (path: string) => {
  const keys = {
    ownerBookStoreBookStores: {
      keyStorageVals: StorageKeys.STORES_OWNER_VALS,
      keyStorageLabels: StorageKeys.STORES_OWNER_LABELS,
    },
  };

  const formatted = formatP(path);

  return keys[formatted as keyof typeof keys];
};
