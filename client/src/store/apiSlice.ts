/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { appInstance } from "@/config/axios";
import { AxiosResponse } from "axios";

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
  console.group("API SLICE");
  console.log(data);
  console.groupEnd();

  try {
    const res: AxiosResponse = await appInstance({
      url,
      method,
      data,
      params,
    });
    return { data: res };
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
  tagTypes: [],
  // i can leave key of slice by default to api of naming as i want
  reducerPath: "appAPI",
  endpoints: () => ({}),
});

export default apiSlice;
