/* eslint-disable @typescript-eslint/no-explicit-any */
import authSlice from "@/features/AuthLayout/authSlice";
import apiSlice from "@/store/apiSlice";
import { StorageKeys, TagsAPI } from "@/types/types";
import { saveStorage } from "../storage";
import { catchErr } from "./API";
import { appInstance } from "@/core/config/axios";

export const handleAsyncQuery = async ({
  queryFulfilled,
  dispatch,
}: {
  queryFulfilled: any;
  dispatch: any;
}) => {
  await catchErr(async () => {
    const { data } = await queryFulfilled;

    saveStorage({ data: data.accessToken, key: StorageKeys.ACCESS });
    appInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data?.accessToken}`;

    dispatch(authSlice.actions.login());
    dispatch(apiSlice.util.invalidateTags([TagsAPI.USER]));
  });
};
