/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { CartItemsGroupedType } from "../../CartPage";
import CartItem from "./components/CartItem/CartItem";
import { CartItemType, CartType } from "@/types/all/Cart";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import SummaryByStore from "./components/SummaryByStore";

type PropsType = {
  groupedByStoreID: CartItemsGroupedType[];
  cart: CartType;
};

const CartItemsList: FC<PropsType> = ({ groupedByStoreID, cart }) => {
  const ids = useCreateIds({
    lengths: [
      Object.keys(groupedByStoreID ?? {}).length,
      ...Object.values(groupedByStoreID ?? {}).map(
        ({ items }: any) => items?.length
      ),
    ],
  });

  return (
    <div className="w-full grid grid-cols-1 gap-10">
      {Object.entries(groupedByStoreID).map(
        ([_, { store, items }]: any, outerI) => (
          <div key={ids[0][outerI]} className="w-full grid grid-cols-1 gap-y-6">
            <SummaryByStore {...{ cart, store, items }} />

            <div className="w-full grid grid-cols-1 gap-y-6 lg:grid-cols-2 gap-x-10">
              {items!.map((el: CartItemType, innerI: number) => (
                <CartItem key={ids[outerI + 1][innerI]} {...{ el }} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CartItemsList;
