/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { CartItemsGroupedType } from "../../CartPage";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import Title from "@/components/elements/Title";
import { getExpectedDeliveredDay } from "@/core/lib/lib";
import CartItem from "./components/CartItem";
import { CartItemType } from "@/types/all/Cart";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import { CiCircleList } from "react-icons/ci";

type PropsType = {
  groupedByStoreID: CartItemsGroupedType[];
};

const CartItemsList: FC<PropsType> = ({ groupedByStoreID }) => {
  const ids = useCreateIds({
    lengths: [
      Object.keys(groupedByStoreID ?? {}).length,
      ...Object.values(groupedByStoreID ?? {}).map(
        ({ items }: any) => items?.length
      ),
    ],
  });

  return (
    <DropStats
      {...{
        el: {
          label: "items list",
          icon: CiCircleList,
        },
        styleUL: "mt-5 max-h-[500px] overflow-y-auto scroll_y scroll_app px-4",
        styleTxt: "txt__4",
        ovHidden: true,
      }}
    >
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
    </DropStats>
  );
};

export default CartItemsList;
