import { StorageKeys } from "@/types/types";
import { capt } from "../lib";

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

export const getKeysSearchBar = (path: string) => {
  const keys = new Map([
    [
      "ownerBookStoreBookStores",
      {
        vals: StorageKeys.STORES_OWNER_VALS,
        labels: StorageKeys.STORES_OWNER_LABELS,
      },
    ],
  ]);

  const formatted = path
    .split("/")
    .slice(1)
    .map((el) =>
      !el.includes("-")
        ? el
        : el
            .split("-")
            .map((el) => capt(el))
            .join("")
    )
    .join("");

  return keys.get(formatted);
};
