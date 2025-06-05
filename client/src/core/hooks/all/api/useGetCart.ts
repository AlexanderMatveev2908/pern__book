import { useGetUserCartQuery } from "@/features/root/rootAPI";
import { useWrapQueryAPI } from "../wrappers/useWrapQueryAPI";
import { useSelector } from "react-redux";
import { getAuthState } from "@/features/AuthLayout/authSlice";

export const useGetCart = () => {
  const isLogged = useSelector(getAuthState).isLogged;

  const resCart = useGetUserCartQuery(undefined, {
    skip: !isLogged,
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
