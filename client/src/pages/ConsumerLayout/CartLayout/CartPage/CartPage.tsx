import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useMixVars } from "@/core/hooks/all/api/useMixVars";
import { isArrOk, isObjOk } from "@/core/lib/lib";
import type { FC } from "react";
import CartItem from "./components/CartItem";

const CartPage: FC = () => {
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

  return (
    <WrapPageAPI
      {...{
        isLoading,
        isError,
        error,
        isSuccess: isObjOk(cart),
        canStay: !!cart?.items?.length,
      }}
    >
      <Title {...{ title: "cart" }} />

      <div className="w-full grid grid-cols-1 gap-10">
        {isArrOk(cart?.items) &&
          cart!.items!.map((el) => <CartItem key={el.id} {...{ el }} />)}
      </div>
    </WrapPageAPI>
  );
};

export default CartPage;
