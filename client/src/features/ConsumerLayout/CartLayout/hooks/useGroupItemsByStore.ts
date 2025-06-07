/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArrOk } from "@/core/lib/lib";
import { BookStoreType } from "@/types/all/bookStore";
import { CartItemType, CartType } from "@/types/all/Cart";
import { useMemo } from "react";

type Params = {
  cart?: CartType;
};

export const useGroupItemsByStore = ({ cart }: Params) => {
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

  return { groupedByStoreID };
};
