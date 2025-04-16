import { StorageKeys } from "@/types/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const saveStorage = ({ data, key }: { data: any; key: StorageKeys }) =>
  sessionStorage.setItem(
    key,
    typeof data !== "object" ? data : JSON.stringify(data)
  );

export const getStorage = (key: StorageKeys) => sessionStorage.getItem(key);
