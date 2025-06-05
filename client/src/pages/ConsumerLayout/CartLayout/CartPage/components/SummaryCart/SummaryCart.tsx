import Title from "@/components/elements/Title";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { isArrOk, priceFormatter } from "@/core/lib/lib";
import WrapTxt from "@/features/ConsumerLayout/CartLayout/components/WrapPairTxt/WrapTxt";
import { X } from "lucide-react";
import type { FC } from "react";

type PropsType = {};

const SummaryCart: FC<PropsType> = ({}) => {
  const { cart } = useGetCart();

  const ids = useCreateIds({ lengths: [cart?.items?.length] });

  return (
    <div className="sticky top-[85px] p-4 pt-0 border-[3px] border-blue-600 rounded-xl grid grid-cols-1 gap-y-4 z-60 bg-neutral-950 w-full max-w-[800px] max-h-[300px] overflow-y-auto scroll_app scroll_y">
      <div className="w-full sticky z-60 top-0 py-4 border-b-2 border-blue-600 bg-neutral-950">
        <Title {...{ title: "summary cart" }} />
      </div>

      <div className="w-full grid grid-cols-1 gap-y-4">
        {isArrOk(cart?.items) &&
          cart!.items!.map((el, i) => (
            <div
              key={ids[0][i]}
              className="w-full grid grid-cols-1 items-center gap-y-3"
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
                <WrapTxt {...{ txt: el.book!.qty }} />

                <X className="icon__sd" />

                <WrapTxt {...{ txt: priceFormatter(el.book!.price) }} />
              </div>

              <div className="w-full flex justify-center"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SummaryCart;
