import SpanPageInfo from "@/components/elements/cards/shared/SpanPageInfo";
import { formatD, priceFormatter } from "@/core/lib/lib";
import { OrderType } from "@/types/all/orders";
import type { FC } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { TbPigMoney } from "react-icons/tb";

type PropsType = {
  o: OrderType;
};

const HeaderOrderPage: FC<PropsType> = ({ o }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-5">
      <SpanPageInfo
        {...{
          el: {
            icon: LuCalendarDays,
            label: "Ordered at",
            val: formatD(+o!.orderedAt!),
          },
        }}
      />

      <SpanPageInfo
        {...{
          el: {
            icon: TbPigMoney,
            label: "Total amount",
            val: priceFormatter(+o!.amount - +o!.discount),
          },
        }}
      />
    </div>
  );
};

export default HeaderOrderPage;
