import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import WrapTxt from "@/components/elements/WrapPairTxt/WrapTxt";
import {
  calcTotPriceCart,
  getDeliveryPrice,
  getExpectedDeliveredDay,
  priceFormatter,
} from "@/core/lib/lib";
import { BookStoreType } from "@/types/all/bookStore";
import { CartItemType, CartType } from "@/types/all/Cart";
import { useMemo, type FC } from "react";

type PropsType = {
  store: BookStoreType;
  cart: CartType;
  items: CartItemType[];
};

const SummaryByStore: FC<PropsType> = ({ cart, store, items }) => {
  const subTotal = useMemo(() => calcTotPriceCart(items), [items]);
  const deliveryPrice = useMemo(
    () =>
      getDeliveryPrice({
        cart: cart!,
        store: store!,
      }),
    [cart, store]
  );

  return (
    <>
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

        <WrapPairTxt {...{ arg: ["subtotal", priceFormatter(subTotal)] }} />

        <WrapPairTxt
          {...{
            arg: [
              "delivery price",
              priceFormatter(deliveryPrice, "Free Delivery"),
            ],
          }}
        />

        <WrapPairTxt
          {...{ arg: ["total", priceFormatter(subTotal + deliveryPrice)] }}
        />
      </div>
    </>
  );
};

export default SummaryByStore;
