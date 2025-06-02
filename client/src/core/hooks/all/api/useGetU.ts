/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { UserType } from "@/types/types";
import { useWrapQueryAPI } from "../wrappers/useWrapQueryAPI";

export const useGetU = (): {
  user: UserType;
  isLoading: boolean;
  isError: boolean;
  error: any;
} => {
  const res = useGetUserProfileQuery() ?? {};
  const { data: { user = {} } = {}, isLoading, isError, error } = res;

  useWrapQueryAPI({ ...res });

  return { user: user as UserType, isLoading, isError, error };
};
