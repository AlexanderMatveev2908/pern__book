import Title from "@/components/elements/Title";
import type { FC } from "react";
import SummaryStoreItem from "./components/SummaryStoreItem";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import { priceFormatter } from "@/core/lib/lib";
import s from "./BriefSummary.module.css";
import { OrderType } from "@/types/all/orders";

type PropsType = {
  order: OrderType;
};

const BriefSummary: FC<PropsType> = ({ order }) => {
  return (
    <div
      className={`${s.brief_summary} w-full grid grid-cols-1 justify-items-center h-fit gap-y-6 xl:order-2`}
    >
      <Title {...{ title: "summary", styleTxt: "txt__4" }} />

      <div className="w-full max-w-[500px] sm:max-w-[600px] border-[3px] border-neutral-800 rounded-xl gap-y-6 grid grid-cols-1 ">
        <div className="w-full sticky top-0 bg-neutral-950 z-60 grid grid-cols-1 pb-2 border-b-2 border-blue-600 py-2 gap-y-2 rounded-t-xl">
          <WrapPairTxt
            {...{
              arg: ["subtotal", priceFormatter(order!.amount)],
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
              arg: ["Total", priceFormatter(order!.amount)],
              customStyles: [
                "justify-self-center txt__3",
                "justify-self-center txt__3",
              ],
            }}
          />
        </div>

        <div className="max-h-[250px] overflow-y-auto scroll_app scroll_y flex flex-col gap-y-6  pb-10 px-4">
          {order.orderStores?.map((el) => (
            <SummaryStoreItem key={el.id} {...{ el }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BriefSummary;
