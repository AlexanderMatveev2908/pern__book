import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";

export const useGetU = () => {
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};
  return user;
};
