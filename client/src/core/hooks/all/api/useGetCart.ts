import { useGetUserCartQuery } from "@/features/root/rootAPI";
import { useWrapQueryAPI } from "../wrappers/useWrapQueryAPI";

export const useGetCart = () => {
  const resCart = useGetUserCartQuery();
  useWrapQueryAPI({ ...resCart });

  const {
    data: { cart } = {},
    isLoading,
    isFetching,
    isError,
    error,
  } = resCart ?? {};

  return {
    cart,
    isLoading: isLoading || isFetching,
    isError,
    error,
  };
};
