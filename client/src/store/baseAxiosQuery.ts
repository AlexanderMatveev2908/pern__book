/* eslint-disable @typescript-eslint/no-explicit-any */
import { appInstance } from "@/core/config/axios";
import {
  __cg,
  isAccessExpired,
  isLoggingOut,
  isRefreshing,
  saveStorage,
} from "@/core/lib/lib";
import { StorageKeys } from "@/types/types";
import { AxiosResponse } from "axios";

export const clearAuthAxios = () =>
  delete appInstance.defaults.headers.common["Authorization"];

export const axiosBaseQuery = async ({
  // rtk pass us main info to work with api
  url,
  method,
  // this is data that we use when make API calls in pages/components
  data: dataParams,
  params,
}: any): Promise<any> => {
  try {
    const res: AxiosResponse = await appInstance({
      url,
      method,
      data: dataParams,
      params,
    });

    return {
      data: { ...res?.data, status: res?.status } as Pick<
        AxiosResponse,
        "data"
      >,
    };
  } catch (err: any) {
    const { response: { data: errData, config, status } = {} } = err ?? {};

    const isRefresh = isRefreshing(config?.url);
    const loggingOut = isLoggingOut(config?.url);
    const isTokenExp = isAccessExpired(errData?.msg);
    const skipRefresh =
      status !== 401 || isRefresh || !isTokenExp || loggingOut;
    const removeSession = errData?.pushOut;

    if (loggingOut || removeSession) clearAuthAxios();

    if (skipRefresh)
      return {
        error: {
          ...err?.response,
          data: {
            ...err?.response?.data,
            loggingOut,
          },
        } as AxiosResponse,
      };

    try {
      // data that include credentials to make api req for protected routes (access token with payload inside that u check in backend )
      const { data: refreshData }: Awaited<Pick<AxiosResponse, "data">> =
        await appInstance.post("/refresh");
      saveStorage({ data: refreshData.accessToken, key: StorageKeys.ACCESS });
      appInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${refreshData.accessStorage}`;

      const retry: AxiosResponse = await appInstance({
        url,
        method,
        // send same data that failed above
        data: dataParams,
        params,
      });

      __cg("refresh success");

      return {
        data: {
          ...retry?.data,
          status: retry?.status,
          refreshed: true,
        } as Pick<AxiosResponse, "data">,
      };
    } catch (err: any) {
      __cg("refresh failed");

      clearAuthAxios();

      return {
        error: {
          ...err?.response,
        } as AxiosResponse,
      };
    }
  }
};
