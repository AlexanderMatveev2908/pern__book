/* eslint-disable @typescript-eslint/no-explicit-any */
import { appInstance } from "@/config/axios";
import {
  avoidTriggerState,
  isAccessExpired,
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
    const { response } = err ?? {};

    const isRefresh = isRefreshing(response?.config?.url);
    const isTokenExp = isAccessExpired(response?.data?.msg);

    if (response.status !== 401 || isRefresh || !isTokenExp)
      return {
        error: err,
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

      return {
        data: {
          ...retry?.data,
          status: retry?.status,
          refreshed: !avoidTriggerState(url),
        },
      };
    } catch (err: any) {
      appInstance.defaults.headers.common["Authorization"] = null;

      return {
        error: err,
      };
    }
  }
};
