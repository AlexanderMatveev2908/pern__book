/* eslint-disable @typescript-eslint/no-explicit-any */
export const saveStorage = ({ data, key }: { data: any; key: string }) =>
  sessionStorage.setItem(
    key,
    typeof data !== "object" ? data : JSON.stringify(data)
  );

export const getStorage = (key: string) => sessionStorage.getItem(key);
