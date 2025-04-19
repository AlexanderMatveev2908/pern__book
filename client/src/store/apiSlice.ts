import { createApi } from "@reduxjs/toolkit/query/react";
import { TagsAPI } from "@/types/types";
import { axiosBaseQuery } from "./baseAxiosQuery";

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
