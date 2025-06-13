import { calcTotPriceCart, getDeliveryPrice } from "@/core/lib/all/utils/calc";
import { CartItemsGroupedType } from "@/features/ConsumerLayout/CartLayout/pages/CartPage/CartPage";
import { useMemo } from "react";

type Params = {
  groupedByStoreID: CartItemsGroupedType[];
};

export const useCalcTotCart = ({ groupedByStoreID }: Params) => {
  const totalCart = useMemo(() => {
    const arr = Object.values(groupedByStoreID ?? {});

    let i = arr.length - 1;
    let tot = 0;

    while (i >= 0) {
      const { store, items } = arr[i];

      const subTotal = calcTotPriceCart(items);
      tot += subTotal;
      tot += subTotal
        ? getDeliveryPrice({
            subTotal,
            store: store!,
          })
        : 0;

      i--;
    }

    return tot;
  }, [groupedByStoreID]);

  return { totalCart };
};
