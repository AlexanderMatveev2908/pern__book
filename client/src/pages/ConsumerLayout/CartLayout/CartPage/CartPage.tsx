/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useMixVars } from "@/core/hooks/all/api/useMixVars";
import { getExpectedDeliveredDay, isArrOk, isObjOk } from "@/core/lib/lib";
import { useMemo, type FC } from "react";
import CartItem from "./components/CartItem";
import SummaryCart from "./components/SummaryCart/SummaryCart";
import { CartItemType } from "@/types/all/Cart";
import { BookStoreType } from "@/types/all/bookStore";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";

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

  const ids = useCreateIds({
    lengths: [
      Object.keys(groupedByStoreID ?? {}).length,
      ...Object.values(groupedByStoreID ?? {}).map(
        ({ items }: any) => items?.length
      ),
    ],
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
      {!isArrOk(cart?.items) ? null : (
        <>
          <SummaryCart {...{ groupedByStoreID }} />

          <Title {...{ title: "items list", styleTxt: "txt__4" }} />

          <div className="w-full grid grid-cols-1 gap-10">
            {Object.entries(groupedByStoreID).map(
              ([_, { store, items }]: any, outerI) => (
                <div
                  key={ids[0][outerI]}
                  className="w-full grid grid-cols-1 gap-y-6"
                >
                  <div className="w-full grid grid-cols-1 p-3 border-[3px] border-blue-600 rounded-xl gap-y-3">
                    <Title {...{ title: store.name, styleTxt: "txt__3" }} />
                    <WrapPairTxt
                      {...{
                        arg: [
                          "expected",
                          getExpectedDeliveredDay({
                            daysToAdd: store!.deliveryTime,
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
        </>
      )}
    </WrapPageAPI>
  );
};

export default CartPage;
