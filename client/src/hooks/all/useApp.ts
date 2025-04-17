import { useGetUserProfileQuery } from "@/features/root/rootSliceAPI";
import { useEffect } from "react";

export const useApp = () => {
  const { data, isLoading, isError, error } = useGetUserProfileQuery(undefined);

  useEffect(() => {
    console.log(data);
    console.log(isLoading);
    console.log(isError);
    console.log(error);
  }, [data, isLoading, isError, error]);
};
