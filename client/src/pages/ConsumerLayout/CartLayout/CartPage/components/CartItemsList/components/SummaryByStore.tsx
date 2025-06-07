import SpanInfoCard from "@/components/elements/cards/shared/SpanInfoCard";
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
import { MdError } from "react-icons/md";

type PropsType = {
  store: BookStoreType;
  cart: CartType;
  items: CartItemType[];
};

const SummaryByStore: FC<PropsType> = ({ store, items }) => {
  const subTotal = useMemo(() => calcTotPriceCart(items), [items]);
  const deliveryPrice = useMemo(
    () =>
      getDeliveryPrice({
        subTotal,
        store: store!,
      }),
    [subTotal, store]
  );

  const storeClosed = useMemo(() => store?.deletedAt, [store]);

  return (
    <>
      <div
        className={`w-full grid grid-cols-1 p-3 border-[3px]  rounded-xl gap-y-3 ${
          storeClosed ? "border-red-600" : "border-blue-600"
        }`}
      >
        <div className="w-full flex justify-center gap-10">
          {storeClosed ? (
            <SpanInfoCard
              {...{
                spanInfo: {
                  icon: MdError,
                  label: "This business has been closed",
                },
                customStyleIcon: "text-red-600",
              }}
            />
          ) : (
            <>
              <WrapTxt
                {...{
                  txt: "Sold by",
                  customStyle: "txt__3",
                }}
              />

              <WrapTxt
                {...{
                  txt: store!.name,
                  customStyle: "txt__3",
                }}
              />
            </>
          )}
        </div>
      </div>

      {!storeClosed && (
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
      )}
    </>
  );
};

export default SummaryByStore;
