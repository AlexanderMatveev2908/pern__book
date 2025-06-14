import ItemID from "@/components/elements/cards/shared/spans/ItemID";
import ItemList from "@/components/elements/cards/shared/ItemList";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";
import SpanInfoCard from "@/components/elements/cards/shared/spans/SpanInfoCard";
import { formatD, priceFormatter } from "@/core/lib/lib";
import { OrderType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import { FaDatabase } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { TbPigMoney } from "react-icons/tb";

type PropsType = {
  o: OrderType;
};

const OrderListItemConsumer: FC<PropsType> = ({ o }) => {
  const images = useMemo(
    () =>
      (o.orderStores ?? [])
        .flatMap((os) =>
          (os.orderItemStores ?? []).flatMap((ois) => ois?.images?.[0])
        )
        .filter((el) => !!el),
    [o]
  );

  return (
    <div className="card">
      <div className="body_card">
        <ItemID {...{ ID: o.id }} />

        <ItemList {...{ images }}>
          <SpanInfoCard
            {...{
              spanInfo: {
                icon: TbPigMoney,
                label: priceFormatter(+o.amount - +o.discount),
              },
            }}
          />

          <SpanInfoCard
            {...{
              spanInfo: {
                icon: FaDatabase,
                label: o.totItems,
              },
            }}
          />

          <SpanInfoCard
            {...{
              spanInfo: {
                icon: LuCalendarDays,
                label: formatD(+o.orderedAt!),
              },
            }}
          />
        </ItemList>
      </div>

      <div className="footer_card">
        <PairBtnsLink {...{ ids: [`/consumer/orders/${o.id}`] }} />
      </div>
    </div>
  );
};

export default OrderListItemConsumer;
