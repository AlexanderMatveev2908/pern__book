import { OrderStoreType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import ItemList from "../shared/ItemList";
import SpanInfoCard from "../shared/SpanInfoCard";
import { HiLibrary } from "react-icons/hi";
import { TbDatabaseCog, TbPigMoney } from "react-icons/tb";
import { formatD, priceFormatter } from "@/core/lib/lib";

type PropsType = {
  o: OrderStoreType;
};

const OrderStoreItem: FC<PropsType> = ({ o }) => {
  const images = useMemo(
    () =>
      (o?.orderItemStores ?? [])
        .flatMap((oi) => oi.images?.[0])
        .filter((el) => !!el),
    [o]
  );

  return (
    <ItemList {...{ images }}>
      <SpanInfoCard
        {...{
          spanInfo: {
            label: o!.store!.name,
            icon: HiLibrary,
          },
        }}
      />
      <SpanInfoCard
        {...{
          spanInfo: {
            label: priceFormatter(+o.amount + +o.delivery),
            icon: TbPigMoney,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: formatD(+(o.order?.orderedAt ?? 0)),
            icon: TbDatabaseCog,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: o!.stage,
            icon: TbDatabaseCog,
          },
        }}
      />
    </ItemList>
  );
};

export default OrderStoreItem;
