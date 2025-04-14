/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { appInstance } from "@/config/axios";
import { AxiosResponse } from "axios";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { isAccessExpired } from "@/types/all/API";

export type TagTypes = "books" | "user";

// const baseQuery = fetchBaseQuery({
//   baseUrl: isDev
//     ? import.meta.env.VITE_BACK_URL_DEV
//     : import.meta.env.VITE_BACK_URL,
//   credentials: "include",
// });

export const middlewareAuth = () => (next: any) => (action: any) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401) {
      const { response: { data, config } = {} } = action.payload;
      console.group("MIDDLEWARE APP");
      console.log(data);
      console.log(config);
      console.groupEnd();

      if (isAccessExpired(data?.msg)) console.log("LOGOUT");
    }
  }

  return next(action);
};

const axiosBaseQuery: BaseQueryFn<{
  url: string;
  method: string;
  data?: any;
  params?: any;
}> = async ({ url, method, data, params }) => {
  // console.group("API SLICE");
  // console.log(data);
  // console.groupEnd();

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
