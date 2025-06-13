import ItemID from "@/components/elements/cards/shared/ItemID";
import ItemList from "@/components/elements/cards/shared/ItemList";
import SpanInfoCard from "@/components/elements/cards/shared/SpanInfoCard";
import { priceFormatter } from "@/core/lib/lib";
import { OrderType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import { FaDatabase } from "react-icons/fa";
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
        </ItemList>
      </div>
    </div>
  );
};

export default OrderListItemConsumer;
