/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { appInstance } from "@/config/axios";
import { AxiosResponse } from "axios";
import { TagsAPI } from "@/types/types";
import { cg } from "@/lib/lib";

export type TagTypes = "books" | "user";

// const baseQuery = fetchBaseQuery({
//   baseUrl: isDev
//     ? import.meta.env.VITE_BACK_URL_DEV
//     : import.meta.env.VITE_BACK_URL,
//   credentials: "include",
// });

const axiosBaseQuery: BaseQueryFn<{
  url: string;
  method: string;
  data?: any;
  params?: any;
}> = async ({ url, method, data, params }) => {
  try {
    const res: AxiosResponse = await appInstance({
      url,
      method,
      data,
      params,
    });

    cg("axios", res);

    return { data: { ...res?.data, status: res?.status } };
  } catch (err: any) {
    return {
      error: err,
    };
  }
};

const apiSlice = createApi({
  // define a base url with options like in axios with his interceptors
  baseQuery: axiosBaseQuery,
  // tags that we use for invalidation of cache api data like in tanstack use query
  tagTypes: [TagsAPI.USER],
  // i can leave key of slice by default to api of naming as i want
  reducerPath: "appAPI",
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  refetchOnFocus: false,
  endpoints: () => ({}),
});

export default apiSlice;
