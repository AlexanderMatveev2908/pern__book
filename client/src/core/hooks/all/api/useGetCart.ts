import { useGetUserCartQuery } from "@/features/root/rootAPI";
import { useWrapQueryAPI } from "../wrappers/useWrapQueryAPI";
import { useGetU } from "./useGetU";

export const useGetCart = () => {
  const { user } = useGetU();

  const resCart = useGetUserCartQuery(undefined, {
    skip: !user?.isVerified,
  });
  useWrapQueryAPI({ ...resCart });

  const { data: { cart } = {}, isLoading, isError, error } = resCart ?? {};

  return {
    cart,
    isLoading,
    isError,
    error,
  };
};
