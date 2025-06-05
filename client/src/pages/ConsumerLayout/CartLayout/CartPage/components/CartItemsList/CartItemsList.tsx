/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { CartItemsGroupedType } from "../../CartPage";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import { getDeliveryPrice, getExpectedDeliveredDay } from "@/core/lib/lib";
import CartItem from "./components/CartItem";
import { CartItemType, CartType } from "@/types/all/Cart";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import WrapTxt from "@/components/elements/WrapPairTxt/WrapTxt";

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
            <div className="w-full grid grid-cols-1 p-3 border-[3px] border-blue-600 rounded-xl gap-y-3">
              <div className="w-full flex justify-center gap-10">
                <WrapTxt {...{ txt: "Sold by", customStyle: "txt__3" }} />

                <WrapTxt {...{ txt: store!.name, customStyle: "txt__3" }} />
              </div>
            </div>

            <div className="w-full grid p-4 border-2 border-neutral-800 rounded-xl items-center grid-cols-1 gap-y-5">
              <WrapPairTxt
                {...{
                  arg: [
                    "expected arrival date",
                    getExpectedDeliveredDay({
                      daysToAdd: store!.deliveryTime,
                    }),
                  ],
                }}
              />

              <WrapPairTxt
                {...{
                  arg: [
                    "delivery price",
                    getDeliveryPrice({
                      cart: cart!,
                      store: store!,
                    }),
                  ],
                }}
              />
            </div>

            {items!.map((el: CartItemType, innerI: number) => (
              <CartItem key={ids[outerI + 1][innerI]} {...{ el }} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default CartItemsList;
