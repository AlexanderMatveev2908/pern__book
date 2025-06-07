import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useMixVars } from "@/core/hooks/all/api/useMixVars";

export const useMixUserCartAsyncStates = () => {
  const {
    cart,
    isLoading: cartLoading,
    isError: isCartError,
    error: cartError,
  } = useGetCart();
  const {
    isLoading: userLoading,
    isError: isUserError,
    error: userError,
    user,
  } = useGetU();
  const isLoading = useMixVars({
    varA: userLoading,
    varB: cartLoading,
  });
  const isError = useMixVars({
    varA: isUserError,
    varB: isCartError,
  });
  const error = useMixVars({
    varA: userError,
    varB: cartError,
  });
  return {
    cart,
    user,
    isLoading,
    isError,
    error,
  };
};
