import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isDev } from "../config/env";

export type TagTypes = "books" | "user";

const baseQuery = fetchBaseQuery({
  baseUrl: isDev
    ? import.meta.env.VITE_BACK_URL_DEV
    : import.meta.env.VITE_BACK_URL,
  credentials: "include",
});

const apiSlice = createApi({
  // define a base url with options like in axios with his interceptors
  baseQuery,
  // tags that we use for invalidation of cache api data like in tanstack use query
  tagTypes: [],
  // i can leave key of slice by default to api of naming as i want
  reducerPath: "appAPI",
  endpoints: () => ({}),
});

export default apiSlice;
