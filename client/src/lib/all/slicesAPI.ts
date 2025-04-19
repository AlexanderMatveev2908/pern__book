/* eslint-disable @typescript-eslint/no-explicit-any */
import { appInstance } from "@/config/axios";
import { saveStorage } from "./storage";
import authSlice from "@/features/AuthLayout/authSlice";
import apiSlice from "@/store/apiSlice";
import { StorageKeys, TagsAPI } from "@/types/types";

export const handleAsyncQuery = async ({
  queryFulfilled,
  dispatch,
}: {
  queryFulfilled: any;
  dispatch: any;
}) => {
  const { data } = await queryFulfilled;

  saveStorage({ data: data.accessToken, key: StorageKeys.ACCESS });
  appInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data?.accessToken}`;

  dispatch(authSlice.actions.login());
  dispatch(apiSlice.util.invalidateTags([TagsAPI.USER]));
};
