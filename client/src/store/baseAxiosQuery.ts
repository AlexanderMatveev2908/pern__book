/* eslint-disable @typescript-eslint/no-explicit-any */
import { appInstance } from "@/config/axios";
import {
  __cg,
  isAccessExpired,
  isLoggingOut,
  isRefreshing,
  saveStorage,
} from "@/lib/lib";
import { StorageKeys } from "@/types/types";
import { AxiosResponse } from "axios";

export const axiosBaseQuery = async ({
  url,
  method,
  data,
  params,
}: any): Promise<any> => {
  try {
    const res: AxiosResponse = await appInstance({
      url,
      method,
      data,
      params,
    });

    return { data: { ...res?.data, status: res?.status } };
  } catch (err: any) {
    __cg("err axios", err);

    const { response: { data, config, status } = {} } = err ?? {};

    const isRefresh = isRefreshing(config?.url);
    const loggingOut = isLoggingOut(config?.url);
    const isTokenExp = isAccessExpired(data?.msg);

    if (loggingOut) appInstance.defaults.headers.common["Authorization"] = null;

    if (status !== 401 || isRefresh || !isTokenExp || loggingOut)
      return {
        error: {
          ...err,
          response: {
            ...err?.response,
            data: {
              ...err?.response?.data,
              loggingOut,
            },
          },
        },
      };

    try {
      const { data } = await appInstance.post("/refresh");
      saveStorage({ data: data.accessToken, key: StorageKeys.ACCESS });
      appInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessStorage}`;

      const retry = await appInstance({
        url,
        method,
        data,
        params,
      });

      __cg("refresh success", retry);

      return {
        data: {
          ...retry?.data,
          status: retry?.status,
          refreshed: true,
        },
      };
    } catch (err: any) {
      __cg("refresh error", err);

      appInstance.defaults.headers.common["Authorization"] = null;

      return {
        error: { ...err },
      };
    }
  }
};
