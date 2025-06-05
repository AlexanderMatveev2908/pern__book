/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/elements/Title";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { getDeliveryPrice, isArrOk, priceFormatter } from "@/core/lib/lib";
import WrapTxt from "@/components/elements/WrapPairTxt/WrapTxt";
import { X } from "lucide-react";
import { useMemo, type FC } from "react";
import { CartItemType } from "@/types/all/Cart";
import { BookStoreType } from "@/types/all/bookStore";

const SummaryCart: FC = () => {
  const { cart } = useGetCart();

  const ids = useCreateIds({ lengths: [cart?.items?.length] });

  const groupedStore = useMemo(
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

  console.log(groupedStore);

  return (
    <div className="sticky top-[85px] p-4 pt-0 border-[3px] border-blue-600 rounded-xl grid grid-cols-1 gap-y-4 z-60 bg-neutral-950 w-full max-w-[800px] ">
      <div className="w-full sticky z-60 top-0 py-4 border-b-[3px] border-blue-600 bg-neutral-950">
        <Title {...{ title: "summary cart" }} />
      </div>

      <div className="w-full grid grid-cols-1 gap-y-4 max-h-[200px] overflow-y-auto scroll_app scroll_y">
        {isArrOk(cart?.items) &&
          cart!.items!.map((el, i) => (
            <div
              key={ids[0][i]}
              className="w-full grid grid-cols-1 items-center gap-y-3 pl-3 border-l-2 border-blue-600"
            >
              <div className="w-full flex justify-start max-w-full">
                <span
                  className="txt__3 clamp_txt"
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

              <div className="w-full grid grid-cols-3 items-center justify-items-center">
                <WrapTxt {...{ txt: "delivery" }} />

                <div className=""></div>

                <WrapTxt
                  {...{
                    txt: getDeliveryPrice({ cart, store: el.book!.store! }),
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SummaryCart;
