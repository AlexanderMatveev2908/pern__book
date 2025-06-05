/* eslint-disable @typescript-eslint/no-explicit-any */
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useMixVars } from "@/core/hooks/all/api/useMixVars";
import { isArrOk } from "@/core/lib/lib";
import { useMemo, type FC } from "react";
import SummaryCart from "./components/SummaryCart/SummaryCart";
import { CartItemType } from "@/types/all/Cart";
import { BookStoreType } from "@/types/all/bookStore";
import CartItemsList from "./components/CartItemsList/CartItemsList";
import WrapAsBorder from "@/components/elements/WrapAsBorder";
import Title from "@/components/elements/Title";

export type CartItemsGroupedType = {
  store: BookStoreType;
  items: CartItemType[];
};

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

  const groupedByStoreID = useMemo(
    () =>
      !isArrOk(cart?.items)
        ? []
        : cart!.items!.reduce((acc: any, curr: CartItemType) => {
            const storeID = curr.book!.store!.id;
            if (!acc[storeID])
              acc[storeID] = {
                store: curr.book!.store!,
                items: [],
              };

            acc[storeID].items.push(curr);

            return acc;
          }, {} as Record<string, { store: BookStoreType; items: CartItemType[] }>),
    [cart]
  );

  return (
    <WrapPageAPI
      {...{
        isLoading,
        isError,
        error,
        isSuccess: isArrOk(cart?.items),
        canStay: !!cart?.items?.length,
      }}
    >
      <Title {...{ title: "Cart summary" }} />

      <div className="w-full grid grid-cols-1 gap-8">
        <WrapAsBorder>
          <SummaryCart {...{ groupedByStoreID }} />
        </WrapAsBorder>

        <WrapAsBorder>
          <CartItemsList {...{ groupedByStoreID }} />
        </WrapAsBorder>
      </div>
    </WrapPageAPI>
  );
};

export default CartPage;
