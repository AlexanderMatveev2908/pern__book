/* eslint-disable @typescript-eslint/no-unused-vars */
import Title from "@/components/elements/Title";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { isArrOk, priceFormatter } from "@/core/lib/lib";
import WrapTxt from "@/components/elements/WrapPairTxt/WrapTxt";
import { X } from "lucide-react";
import { type FC } from "react";
import { CartItemType } from "@/types/all/Cart";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import { FaCalculator } from "react-icons/fa";
import { CartItemsGroupedType } from "../../CartPage";

type PropsType = {
  groupedByStoreID: CartItemsGroupedType[];
};

const SummaryCart: FC<PropsType> = ({ groupedByStoreID }) => {
  const { cart } = useGetCart();

  const ids = useCreateIds({
    lengths: [
      Object.keys(groupedByStoreID ?? {}).length,
      ...Object.values(groupedByStoreID).map(({ items }) => items?.length),
    ],
  });

  return !isArrOk(cart?.items) ? null : (
    <div className="grid grid-cols-1 gap-y-4 z-60 bg-neutral-950 w-full max-w-[1000px] ">
      <DropStats
        {...{
          el: {
            label: "Summary",
            icon: FaCalculator,
          },
          ovHidden: true,
          styleUL:
            "mt-5 px-4 max-h-[500px] scroll_app scroll_y overflow-y-auto",
        }}
      >
        <div className="w-full grid grid-cols-1 gap-y-8">
          {Object.entries(groupedByStoreID).map(
            ([_, { store, items }], outerI) => (
              <div
                key={ids[0][outerI]}
                className="w-full grid grid-cols-1 gap-y-6 justify-items-center"
              >
                <div className="w-full border-2 border-blue-600 rounded-xl grid grid-cols-1 py-2">
                  <Title {...{ title: store!.name, styleTxt: "txt__3" }} />
                </div>

                {items!.map((el: CartItemType, innerI: number) => (
                  <div
                    key={ids[outerI + 1][innerI]}
                    className="w-full grid grid-cols-1 items-center gap-y-3 pl-3 border-blue-600 border-l-2"
                  >
                    <div className="w-full flex justify-start max-w-full">
                      <span
                        className="txt__2 clamp_txt"
                        style={{
                          lineClamp: 2,
                          WebkitLineClamp: 2,
                        }}
                      >
                        {el.book!.title}
                      </span>
                    </div>

                    <div className="w-full grid grid-cols-3 justify-items-center items-center">
                      <WrapTxt {...{ txt: el!.qty }} />

                      <X className="icon__sd" />

                      <WrapTxt {...{ txt: priceFormatter(el.book!.price) }} />
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </DropStats>
    </div>
  );
};

export default SummaryCart;
