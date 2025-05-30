/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { UserType } from "@/types/types";

export const useGetU = (): {
  user: UserType;
  isLoading: boolean;
  isError: boolean;
  error: any;
} => {
  const {
    data: { user = {} } = {},
    isLoading,
    isError,
    error,
  } = useGetUserProfileQuery() ?? {};
  return { user: user as UserType, isLoading, isError, error };
};
