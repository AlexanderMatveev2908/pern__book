/* eslint-disable @typescript-eslint/no-explicit-any */
import { appInstance } from "@/core/config/axios";
import {
  __cg,
  isAccessExpired,
  isLoggingOut,
  isRefreshing,
  saveStorage,
  serializeObjRtk,
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
  responseType,
}: any): Promise<any> => {
  try {
    const res: AxiosResponse = await appInstance({
      url,
      method,
      data: dataParams,
      params,
      responseType,
    });

    const resultData =
      responseType === "blob"
        ? {
            blob: res.data,
            status: res.status,
          }
        : {
            ...res.data,
            status: res.status,
          };

    return {
      data: resultData,
    };
  } catch (err: any) {
    const rawData = err?.response?.data;

    let msg: string = err?.response?.data?.msg;
    const status: number = err?.response?.status;

    if (rawData instanceof Blob && rawData.type === "application/json") {
      try {
        const txt = await rawData.text();
        const parsed = JSON.parse(txt);

        msg = parsed.msg;
      } catch (err) {
        __cg("blob parse err", err);
      }
    }

    const { response: { data: errData, config } = {} } = err ?? {};

    const isRefresh = isRefreshing(config?.url);
    const loggingOut = isLoggingOut(config?.url);
    const isTokenExp = isAccessExpired(msg);
    const skipRefresh =
      status !== 401 || isRefresh || !isTokenExp || loggingOut;
    const removeSession = errData?.pushOut;

    if (loggingOut || removeSession) clearAuthAxios();

    const serializable = serializeObjRtk(err);

    if (skipRefresh)
      return {
        error: {
          ...serializable?.response,
          data: {
            ...serializable?.response?.data,
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
        responseType,
      });

      __cg("refresh success");

      const refreshedData =
        responseType === "blob"
          ? {
              blob: retry.data,
              status: retry.status,
              refreshed: true,
            }
          : {
              ...retry.data,
              status: retry.status,
              refreshed: true,
            };

      return {
        data: refreshedData,
      };
    } catch (err: any) {
      __cg("refresh failed");

      clearAuthAxios();

      const serializable = serializeObjRtk(err);

      return {
        error: {
          ...serializable?.response,
        } as AxiosResponse,
      };
    }
  }
};
