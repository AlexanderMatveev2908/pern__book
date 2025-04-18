/* eslint-disable @typescript-eslint/no-explicit-any */
import { appInstance } from "@/config/axios";
import { saveStorage } from "@/lib/lib";
import { AvoidTriggerPath, MsgErrSession, StorageKeys } from "@/types/types";
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

    const isRefreshing = response?.config?.url === "/refresh";
    const isAccessExpired = [
      MsgErrSession.ACCESS_EXPIRED,
      MsgErrSession.ACCESS_INVALID,
      MsgErrSession.ACCESS_NOT_PROVIDED,
    ].includes(response?.data?.msg);

    if (response.status !== 401 || isRefreshing || !isAccessExpired)
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
          refreshed: url !== AvoidTriggerPath.LOGOUT,
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
