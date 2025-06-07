import { calcTotPriceCart, getDeliveryPrice } from "@/core/lib/all/utils/calc";
import { BookStoreType } from "@/types/all/bookStore";
import { CartItemType } from "@/types/all/Cart";
import { useMemo } from "react";

type Params = {
  store: BookStoreType;
  items: CartItemType[];
};

export const useCalcSubtotalStore = ({ items, store }: Params) => {
  const subTotal = useMemo(() => calcTotPriceCart(items), [items]);
  const deliveryPrice = useMemo(
    () =>
      getDeliveryPrice({
        subTotal,
        store: store!,
      }),
    [subTotal, store]
  );

  return {
    subTotal,
    deliveryPrice,
  };
};
