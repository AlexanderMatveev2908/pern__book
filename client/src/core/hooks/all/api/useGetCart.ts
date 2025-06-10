import { useGetUserCartQuery } from "@/features/root/rootAPI";
import { useSelector } from "react-redux";
import { getAuthState } from "@/features/AuthLayout/authSlice";

export const useGetCart = ({
  refetchOnMountOrArgChange,
}: {
  refetchOnMountOrArgChange?: boolean;
} = {}) => {
  const isLogged = useSelector(getAuthState).isLogged;

  const resCart = useGetUserCartQuery(undefined, {
    skip: !isLogged,
    refetchOnMountOrArgChange,
  });
  // useWrapQueryAPI({ ...resCart });

  const { data: { cart } = {}, isLoading, isError, error } = resCart ?? {};

  return {
    cart,
    isLoading,
    isError,
    error,
  };
};
