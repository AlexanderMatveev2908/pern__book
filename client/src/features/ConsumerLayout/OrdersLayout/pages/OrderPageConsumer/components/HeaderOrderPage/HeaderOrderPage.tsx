import SpanPageInfo from "@/components/elements/cards/shared/SpanPageInfo";
import { formatD, priceFormatter } from "@/core/lib/lib";
import { OrderType } from "@/types/all/orders";
import type { FC } from "react";
import { FaDatabase } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { TbDatabaseCog, TbPigMoney } from "react-icons/tb";

type PropsType = {
  o: OrderType;
};

const HeaderOrderPage: FC<PropsType> = ({ o }) => {
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-y-5 gap-x-10">
      <SpanPageInfo
        {...{
          el: {
            icon: LuCalendarDays,
            label: "Ordered at",
            val: formatD(+o!.orderedAt!),
          },
          styleSubParents: [null, "xl:justify-self-end "],
        }}
      />

      <SpanPageInfo
        {...{
          el: {
            icon: TbPigMoney,
            label: "Total amount",
            val: priceFormatter(+o!.amount - +o!.discount),
          },
          styleSubParents: [null, "xl:justify-self-end "],
        }}
      />

      <SpanPageInfo
        {...{
          el: {
            icon: FaDatabase,
            label: "Total items",
            val: o.totItems + "",
          },
          styleSubParents: [null, "xl:justify-self-end "],
        }}
      />

      <SpanPageInfo
        {...{
          el: {
            icon: TbDatabaseCog,
            label: "Status",
            val: o.stage,
          },
          styleSubParents: [null, "xl:justify-self-end "],
        }}
      />
    </div>
  );
};

export default HeaderOrderPage;
