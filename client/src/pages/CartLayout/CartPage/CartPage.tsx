import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import { isObjOk } from "@/core/lib/lib";
import type { FC } from "react";

const CartPage: FC = () => {
  const { cart, isLoading, isError, error } = useGetCart();

  return (
    <WrapPageAPI {...{ isLoading, isError, error, isSuccess: isObjOk(cart) }}>
      <Title {...{ title: "My Cart" }} />
    </WrapPageAPI>
  );
};

export default CartPage;
