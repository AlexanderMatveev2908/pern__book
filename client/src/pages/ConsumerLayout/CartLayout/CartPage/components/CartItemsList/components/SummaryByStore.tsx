import SpanInfoCard from "@/components/elements/cards/shared/SpanInfoCard";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import { getExpectedDeliveredDay } from "@/core/lib/all/utils/calc";
import { priceFormatter } from "@/core/lib/lib";
import { useCalcSubtotalStore } from "@/features/ConsumerLayout/CartLayout/hooks/useCalcSubtotalStore";
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
  const { subTotal, deliveryPrice } = useCalcSubtotalStore({ items, store });

  const storeClosed = useMemo(() => store?.deletedAt, [store]);

  return (
    <div className="w-full grid gap-x-10 gap-y-6 grid-cols-1 lg:grid-cols-2">
      <div
        className={`w-full h-fit grid grid-cols-1 p-4 border-[3px]  rounded-xl gap-y-3  ${
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
            <div className="w-full grid grid-cols-1 gap-y-5">
              <WrapPairTxt
                {...{
                  arg: ["Seller", store!.name],
                }}
              />

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
            </div>
          )}
        </div>
      </div>

      {!storeClosed && !!subTotal && (
        <div className="w-full grid p-4 border-2 border-neutral-800 rounded-xl items-center grid-cols-1 gap-y-5">
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
    </div>
  );
};

export default SummaryByStore;
