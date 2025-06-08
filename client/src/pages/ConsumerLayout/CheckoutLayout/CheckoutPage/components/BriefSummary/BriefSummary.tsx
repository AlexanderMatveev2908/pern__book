import Title from "@/components/elements/Title";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { CartItemsGroupedType } from "@/pages/ConsumerLayout/CartLayout/CartPage/CartPage";
import type { FC } from "react";
import SummaryStoreItem from "../components/SummaryStoreItem";
import { useCalcTotCart } from "@/features/ConsumerLayout/CartLayout/hooks/useCalcTotCart";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import { priceFormatter } from "@/core/lib/lib";
import s from "./BriefSummary.module.css";

type PropsType = {
  groupedByStoreID: CartItemsGroupedType[];
};

const BriefSummary: FC<PropsType> = ({ groupedByStoreID }) => {
  const ids = useCreateIds({
    lengths: [
      Object.keys(groupedByStoreID).length,
      ...Object.values(groupedByStoreID).map(({ items }) => items?.length),
    ],
  });

  const { totalCart } = useCalcTotCart({ groupedByStoreID });

  return (
    <div
      className={`${s.brief_summary} w-full grid grid-cols-1 justify-items-center h-fit gap-y-6 xl:order-2`}
    >
      <Title {...{ title: "summary", styleTxt: "txt__4" }} />

      <div className="w-full max-w-[500px] sm:max-w-[600px] border-[3px] border-neutral-800 rounded-xl gap-y-6 grid grid-cols-1 ">
        <div className="w-full sticky top-0 bg-neutral-950 z-60 grid grid-cols-1 pb-2 border-b-2 border-blue-600 py-2 gap-y-3 rounded-t-xl">
          <WrapPairTxt
            {...{
              arg: ["subtotal", priceFormatter(totalCart)],
              customStyles: [
                "justify-self-center txt__2",
                "justify-self-center txt__2",
              ],
            }}
          />
          <WrapPairTxt
            {...{
              arg: ["discount", priceFormatter(0)],
              customStyles: [
                "justify-self-center txt__2",
                "justify-self-center txt__2",
              ],
            }}
          />
          <WrapPairTxt
            {...{
              arg: ["Total", priceFormatter(totalCart)],
              customStyles: [
                "justify-self-center txt__3",
                "justify-self-center txt__3",
              ],
            }}
          />
        </div>

        <div className="max-h-[250px] overflow-y-auto scroll_app scroll_y flex flex-col gap-y-6  pb-10 px-4">
          {Object.values(groupedByStoreID).map(({ store, items }, outerIdx) => (
            <SummaryStoreItem key={ids[0][outerIdx]} {...{ store, items }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BriefSummary;
