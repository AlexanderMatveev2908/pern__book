/* eslint-disable @typescript-eslint/no-explicit-any */
import { appInstance } from "@/config/axios";
import authSlice from "@/features/AuthLayout/authSlice";
import apiSlice from "@/store/apiSlice";
import { StorageKeys, TagsAPI } from "@/types/types";
import { saveStorage } from "../storage";

export const handleAsyncQuery = async ({
  queryFulfilled,
  dispatch,
}: {
  queryFulfilled: any;
  dispatch: any;
}) => {
  try {
    const { data } = await queryFulfilled;

    saveStorage({ data: data.accessToken, key: StorageKeys.ACCESS });
    appInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data?.accessToken}`;

    dispatch(authSlice.actions.login());
    dispatch(apiSlice.util.invalidateTags([TagsAPI.USER]));
  } catch {
    //
  }
};
